create table todos (
  id bigint generated always as identity primary key,
  task text not null,
  is_complete boolean not null default false,
  inserted_at timestamptz not null default now()
);
