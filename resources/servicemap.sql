create database [servicemap]

use [servicemap]

create table service
(
    id bigint identity(1,1) not null primary key,
    name varchar(155),
    active bit default 1,
    createdDate datetime default getdate(),
    updatedDate datetime default getdate(),
);

insert into service (name) values('parent-service')
insert into service(name) values('child-01-service')
insert into service(name) values('child-02-service')
insert into service(name) values('child-03-service')
insert into service(name) values('child-04-service')
insert into service(name) values('child-05-service')
insert into service(name) values('child-06-service')
insert into service(name) values('child-07-service')
insert into service(name) values('child-08-service')
insert into service(name) values('child-09-service')
insert into service(name) values('child-10-service')
insert into service(name) values('child-11-service')
insert into service(name) values('child-12-service')
insert into service(name) values('child-13-service')
insert into service(name) values('child-14-service')


create table service_map
(
    id bigint identity(1,1) not null primary key,
    serviceId bigint not null,
    consumerServiceId bigint not null,
    active bit default 1,
    createdDate datetime default getdate(),
    updatedDate datetime default getdate(),
);


insert into service_map (serviceId,consumerServiceId) values(1,2);
insert into service_map(serviceId,consumerServiceId) values(1,3);
insert into service_map(serviceId,consumerServiceId) values(1,4);
insert into service_map(serviceId,consumerServiceId) values(1,5);
insert into service_map(serviceId,consumerServiceId) values(1,6);
insert into service_map(serviceId,consumerServiceId) values(1,7);
insert into service_map(serviceId,consumerServiceId) values(1,8);
insert into service_map (serviceId,consumerServiceId) values(1,9);
insert into service_map(serviceId,consumerServiceId) values(1,10);
insert into service_map(serviceId,consumerServiceId) values(1,11);
insert into service_map(serviceId,consumerServiceId) values(1,12);
insert into service_map(serviceId,consumerServiceId) values(1,13);
insert into service_map(serviceId,consumerServiceId) values(1,14);
insert into service_map(serviceId,consumerServiceId) values(1,15);

