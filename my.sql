use hci;

create table event (
id int primary key AUTO_INCREMENT,
title varchar(255) not null,
st_time datetime not null,
ed_time datetime not null,
location varchar(255) not null,
description mediumtext,
min_num_attendee int,
num_pts_per_hour int,
creator varchar(255) not null DEFAULT 'UCB'
);

create table rsvp (
event_id int not null,
username varchar(255) not null,
message mediumtext,
rsvp_time timestamp default current_timestamp,
foreign key (event_id) references event(id)
);

/* test query */

select id, st_time, title, description
from event 
where creator = 'Alice'
order by st_time desc;

/* test data */

insert into event (
title, st_time, ed_time, 
location, description, 
min_num_attendee, num_pts_per_hour, creator)
values (
'need help shopping', 
STR_TO_DATE('12/15/2015 8:00:00 AM', '%c/%e/%Y %r'),
STR_TO_DATE('12/15/2015 9:30:00 AM', '%c/%e/%Y %r'),
'1002 Commonwealth Ave.',
'I need three people more details more details',
3, 100,
'Alice');

insert into event (
title, st_time, ed_time, 
location, description, 
min_num_attendee, num_pts_per_hour, creator)
values (
'need help shopping Dec. 20', 
STR_TO_DATE('12/20/2015 8:00:00 AM', '%c/%e/%Y %r'),
STR_TO_DATE('12/20/2015 9:30:00 AM', '%c/%e/%Y %r'),
'1002 Commonwealth Ave.',
'I need three people more details more details',
3, 100,
'Alice');

insert into event (
title, st_time, ed_time, 
location, description, 
min_num_attendee, num_pts_per_hour, creator)
values (
'need help shopping Dec. 31', 
STR_TO_DATE('12/31/2015 8:00:00 AM', '%c/%e/%Y %r'),
STR_TO_DATE('12/31/2015 9:30:00 AM', '%c/%e/%Y %r'),
'1002 Commonwealth Ave.',
'I need three people more details more details',
3, 100,
'Alice');

insert into rsvp (event_id, username, message)
values (1, 'Mary', 'coming!');

insert into rsvp (event_id, username, message)
values (1, 'Jennifer', 'a very very very veryvery veryvery verylong long long long long long longlong long longlong long longlong long longlong long long message ');