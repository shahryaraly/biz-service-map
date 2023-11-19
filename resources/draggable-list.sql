create database draggablelist

use [draggablelist]

create table list
(
    id bigint identity(1,1) not null primary key,
    title varchar(155),
    active bit default 1,
    created_date datetime default getdate(),
    updated_date datetime default getdate(),
);

create table list_item
(
    id bigint identity(1,1) not null primary key,
    listId bigint not null,
    title varchar(155),
    description varchar(550),
    active bit default 1,
    created_date datetime default getdate(),
    updated_date datetime default getdate(),
);