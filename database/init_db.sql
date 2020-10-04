SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pid <> pg_backend_pid();

ALTER role postgres WITH password 'postgres';

DROP database if EXISTS user_service;
CREATE database user_service;
DROP role if EXISTS user_service;
CREATE role user_service WITH password 'password' LOGIN nocreatedb nocreaterole;

DROP database if EXISTS map_service;
CREATE database map_service;
DROP role if EXISTS map_service;
CREATE role map_service WITH password 'password' LOGIN nocreatedb nocreaterole;
