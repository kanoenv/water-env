
create or replace function public.get_tree_campaign_public_stats()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'registered', (select count(*) from public.tree_campaign_applications where campaign::text = '10_million_2026'),
    'approved', (select count(*) from public.tree_campaign_applications where campaign::text = '10_million_2026' and status::text in ('approved','seeds_distributed','completed')),
    'pending', (select count(*) from public.tree_campaign_applications where campaign::text = '10_million_2026' and status::text in ('pending','under_review')),
    'seed_records', (select count(*) from public.tree_seed_distributions),
    'total_seeds', (select coalesce(sum(quantity),0) from public.tree_seed_distributions),
    'planted', (select coalesce(sum(trees_planted),0) from public.tree_planting_logs),
    'log_entries', (select count(*) from public.tree_planting_logs),
    'sites', (select count(distinct location_name) from public.tree_planting_logs where location_name is not null),
    'survival', (select coalesce(round(avg(survival_rate)),0) from public.tree_planting_logs where survival_rate is not null)
  );
$$;

create or replace function public.get_tree_campaign_directory(_search text default null, _status text default 'approved', _limit int default 24, _offset int default 0)
returns table(organization_name text, address text, status text, organization_type text)
language sql
stable
security definer
set search_path = public
as $$
  select a.organization_name, a.address, a.status::text, a.organization_type
  from public.tree_campaign_applications a
  where a.campaign::text = '10_million_2026'
    and (
      _status = 'all'
      or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
      or (_status = 'pending' and a.status::text in ('pending','under_review'))
    )
    and (_search is null or _search = '' or a.organization_name ilike '%' || _search || '%' or a.address ilike '%' || _search || '%')
  order by a.organization_name asc
  limit least(coalesce(_limit, 24), 60) offset coalesce(_offset, 0);
$$;

create or replace function public.get_tree_campaign_directory_count(_search text default null, _status text default 'approved')
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::int
  from public.tree_campaign_applications a
  where a.campaign::text = '10_million_2026'
    and (
      _status = 'all'
      or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
      or (_status = 'pending' and a.status::text in ('pending','under_review'))
    )
    and (_search is null or _search = '' or a.organization_name ilike '%' || _search || '%' or a.address ilike '%' || _search || '%');
$$;

grant execute on function public.get_tree_campaign_public_stats() to anon, authenticated;
grant execute on function public.get_tree_campaign_directory(text, text, int, int) to anon, authenticated;
grant execute on function public.get_tree_campaign_directory_count(text, text) to anon, authenticated;
