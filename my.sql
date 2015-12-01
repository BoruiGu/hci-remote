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

alter table event add nearest_stop varchar(255);

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

insert into event (
title, st_time, ed_time, 
location, description, nearest_stop)
values (
'Positive parenting',
STR_TO_DATE('12/1/2015 4:30:00 PM', '%c/%e/%Y %r'),
STR_TO_DATE('12/1/2015 5:30:00 PM', '%c/%e/%Y %r'),
'30 Bickford Street, Jamaica Plain, MA 02130',
'Positive parenting, an interactive workshop series, for parents of children 0-5 years old. TWO MINI SERIES: Parenting Sucess Despite the Stress, Violence Through the Eyes of a Child. Eight sessions on Tuesday Evenings October 20, October 27, November 3, November 10, November 17, December 1, December 8, December 15. NO FEE',
'Jackson Square - Orange Line');

insert into event (
title, st_time, ed_time, 
location, description, nearest_stop)
values (
'Budgeting Workshop',
STR_TO_DATE('12/1/2015 5:30:00 PM', '%c/%e/%Y %r'),
STR_TO_DATE('12/1/2015 6:40:00 PM', '%c/%e/%Y %r'),
'727 Atlantic Ave., Boston, MA 02111',
'For any questions contact: Monica',
'Chinatown - Orange Line');

insert into event (
title, st_time, ed_time, 
location, description, nearest_stop)
values (
'Holiday Wreath Making',
STR_TO_DATE('12/2/2015 1:16:00 PM', '%c/%e/%Y %r'),
STR_TO_DATE('12/2/2015 6:00:00 PM', '%c/%e/%Y %r'),
'15 Christopher St., Dorchester, MA 02122',
'For survivors of homicide victims, this time of year can be especially hard. Join the Peace Institute and come together in solidarity and celebrate loved ones and the holidays. Dinner will be provided. Please bring a photo, button, or memento of loved ones to incorporate into the wreath if you wish to do so. RSVP strongly recommended to alexandra@ldbpeaceinstitute.org or call (617) 825-1917.',
'Fields Corner - Red Line');