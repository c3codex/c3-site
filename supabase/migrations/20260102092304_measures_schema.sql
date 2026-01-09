create schema if not exists measures;

do $$ begin
  create type measures.material_type as enum ('lapis','obsidian','crystal','marble');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type measures.artifact_kind as enum ('original','render','thumb','detail','audio','video');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type measures.aspect_kind as enum ('oracle','scroll','breathrite','reflection');
exception when duplicate_object then null;
end $$;

create table if not exists measures.plates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  material measures.material_type not null,
  sequence_number int not null,
  group_type text not null, -- gate | epithet | me | pillar
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists measures.artifacts (
  id uuid primary key default gen_random_uuid(),
  plate_id uuid references measures.plates(id) on delete cascade,
  kind measures.artifact_kind not null,
  storage_bucket text not null default 'sealed',
  storage_path text not null,
  width int,
  height int,
  mime_type text,
  sha256 text,
  is_primary boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_measures_artifacts_plate on measures.artifacts(plate_id);

create table if not exists measures.aspects (
  id uuid primary key default gen_random_uuid(),
  plate_id uuid references measures.plates(id) on delete cascade,
  kind measures.aspect_kind not null,
  title text,
  body_markdown text not null,
  body_json jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_measures_aspects_plate on measures.aspects(plate_id);

create table if not exists measures.plate_links (
  from_plate uuid references measures.plates(id) on delete cascade,
  to_plate uuid references measures.plates(id) on delete cascade,
  link_type text not null,
  weight int default 1,
  primary key (from_plate, to_plate, link_type)
);

create or replace function measures.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_touch_plates on measures.plates;
create trigger trg_touch_plates
before update on measures.plates
for each row execute function measures.touch_updated_at();

drop trigger if exists trg_touch_aspects on measures.aspects;
create trigger trg_touch_aspects
before update on measures.aspects
for each row execute function measures.touch_updated_at();
