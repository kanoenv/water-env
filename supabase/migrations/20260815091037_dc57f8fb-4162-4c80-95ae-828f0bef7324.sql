CREATE OR REPLACE FUNCTION public.get_tree_campaign_directory(_search text DEFAULT NULL::text, _status text DEFAULT 'approved'::text, _limit integer DEFAULT 24, _offset integer DEFAULT 0, _type text DEFAULT NULL::text, _location text DEFAULT NULL::text)
 RETURNS TABLE(organization_name text, address text, status text, organization_type text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select a.organization_name, a.address, a.status::text, a.organization_type
  from public.tree_campaign_applications a
  where a.campaign::text = '10_million_2026'
    and coalesce(btrim(a.organization_name), '') <> ''
    and (
      _status = 'all'
      or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
      or (_status = 'pending' and a.status::text in ('pending','under_review'))
    )
    and (_type is null or _type = '' or _type = 'all' or lower(coalesce(a.organization_type,'')) = lower(_type))
    and (_location is null or _location = '' or _location = 'all' or a.address ilike '%' || _location || '%')
    and (_search is null or _search = '' or a.organization_name ilike '%' || _search || '%' or a.address ilike '%' || _search || '%')
  order by a.organization_name asc
  limit least(coalesce(_limit, 24), 60) offset coalesce(_offset, 0);
$function$;

CREATE OR REPLACE FUNCTION public.get_tree_campaign_directory_count(_search text DEFAULT NULL::text, _status text DEFAULT 'approved'::text, _type text DEFAULT NULL::text, _location text DEFAULT NULL::text)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select count(*)::int
  from public.tree_campaign_applications a
  where a.campaign::text = '10_million_2026'
    and coalesce(btrim(a.organization_name), '') <> ''
    and (
      _status = 'all'
      or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
      or (_status = 'pending' and a.status::text in ('pending','under_review'))
    )
    and (_type is null or _type = '' or _type = 'all' or lower(coalesce(a.organization_type,'')) = lower(_type))
    and (_location is null or _location = '' or _location = 'all' or a.address ilike '%' || _location || '%')
    and (_search is null or _search = '' or a.organization_name ilike '%' || _search || '%' or a.address ilike '%' || _search || '%');
$function$;

CREATE OR REPLACE FUNCTION public.get_tree_campaign_directory_facets(_status text DEFAULT 'approved'::text)
 RETURNS json
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  with base as (
    select a.organization_type, a.address
    from public.tree_campaign_applications a
    where a.campaign::text = '10_million_2026'
      and coalesce(btrim(a.organization_name), '') <> ''
      and (
        _status = 'all'
        or (_status = 'approved' and a.status::text in ('approved','seeds_distributed','completed'))
        or (_status = 'pending' and a.status::text in ('pending','under_review'))
      )
  ), lgas as (
    select unnest(array['Ajingi','Albasu','Bagwai','Bebeji','Bichi','Bunkure','Dala','Dambatta','Dawakin Kudu','Dawakin Tofa','Doguwa','Fagge','Gabasawa','Garko','Garun Mallam','Gaya','Gezawa','Gwale','Gwarzo','Kabo','Kano Municipal','Karaye','Kibiya','Kiru','Kumbotso','Kunchi','Kura','Madobi','Makoda','Minjibir','Nasarawa','Rano','Rimin Gado','Rogo','Shanono','Sumaila','Takai','Tarauni','Tofa','Tsanyawa','Tudun Wada','Ungogo','Warawa','Wudil']) as name
  )
  select json_build_object(
    'types', (
      select coalesce(json_agg(t order by t.count desc), '[]'::json)
      from (
        select lower(btrim(organization_type)) as value, count(*)::int as count
        from base
        where coalesce(btrim(organization_type),'') <> ''
        group by 1
      ) t
    ),
    'locations', (
      select coalesce(json_agg(l order by l.count desc), '[]'::json)
      from (
        select lgas.name as value, count(base.*)::int as count
        from lgas join base on base.address ilike '%' || lgas.name || '%'
        group by 1
      ) l
    )
  );
$function$;

GRANT EXECUTE ON FUNCTION public.get_tree_campaign_directory(text, text, integer, integer, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_tree_campaign_directory_count(text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_tree_campaign_directory_facets(text) TO anon, authenticated;