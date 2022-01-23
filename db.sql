create table Location
(
    id   int auto_increment
        primary key,
    name varchar(1000) null
);

create table LocationHoliday
(
    id         int auto_increment
        primary key,
    locationId int           null,
    name       varchar(1000) not null,
    date       datetime      not null,
    constraint LocationHoliday_Location_id_fk
        foreign key (locationId) references Location (id)
            on delete cascade
);

create table Person
(
    id         int auto_increment
        primary key,
    locationId int           not null,
    firstName  varchar(1000) not null,
    lastName   varchar(1000) not null,
    constraint Person_Location_id_fk
        foreign key (locationId) references Location (id)
            on delete cascade
);

create table PersonVacation
(
    id            int auto_increment
        primary key,
    personId      int      not null,
    date          datetime not null,
    fractionOfDay float    not null,
    constraint PersonVacation_Person_id_fk
        foreign key (personId) references Person (id)
            on delete cascade
);

create table ProgramIncrement
(
    id   int auto_increment
        primary key,
    name varchar(1000) not null
);

create table Iteration
(
    id                 int auto_increment
        primary key,
    programIncrementId int           not null,
    name               varchar(1000) not null,
    startDate          datetime      not null,
    lengthInDays       int           not null,
    points             int           not null,
    constraint Iteration_ProgramIncrement_id_fk
        foreign key (programIncrementId) references ProgramIncrement (id)
            on delete cascade
);

create table Team
(
    id   int auto_increment
        primary key,
    name varchar(1000) not null
);

create table PersonTeam
(
    id         int auto_increment
        primary key,
    personId   int           not null,
    teamId     int           not null,
    role       varchar(1000) not null,
    percentage int           not null,
    constraint PersonTeam_pk
        unique (personId, teamId),
    constraint PersonTeam_Person_id_fk
        foreign key (personId) references Person (id)
            on delete cascade,
    constraint PersonTeam_Team_id_fk
        foreign key (teamId) references Team (id)
            on delete cascade
);

