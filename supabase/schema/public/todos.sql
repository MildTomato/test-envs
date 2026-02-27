create table todos (
  id bigint generated always as identity primary key,
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);
