
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
    and coalesce(btrim(a.organization_name), '') <> ''
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
    and coalesce(btrim(a.organization_name), '') <> ''
    and (
      _status = 'all'
      or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
      or (_status = 'pending' and a.status::text in ('pending','under_review'))
    )
    and (_search is null or _search = '' or a.organization_name ilike '%' || _search || '%' or a.address ilike '%' || _search || '%');
$$;
