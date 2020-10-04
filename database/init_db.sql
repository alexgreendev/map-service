SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pid <> pg_backend_pid();

DROP database if EXISTS user_service;
CREATE database user_service;
DROP role if EXISTS user_service;

ALTER role postgres WITH password 'postgres';
CREATE role user_service WITH password 'password' LOGIN nocreatedb nocreaterole;
