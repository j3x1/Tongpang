insert into cars values ('Toyota', 'Crown');
insert into cars values ('Ferrari', 'California');
insert into cars values ('Nissan', 'Sunny');

insert into users (email, name, license_plate, company, model) values ('driver@drive.com', 'Road Runner', 'ABS7894A', 'Toyota', 'Crown');
insert into users (email, name, license_plate, company, model) values ('bullet@concorde.com', 'Baby', 'XXX1234X', 'Ferrari', 'California');

insert into users (email, name) values ('passenger@sit.com', 'Monsieur Potato');
insert into users (email, name) values ('nondriver@sit.com', 'Madame Potato');

insert into languages values ('driver@drive.com', 'English');
insert into languages values ('driver@drive.com', 'Chinese');
insert into languages values ('bullet@concorde.com', 'Urdu');

insert into trips values ('driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2015-12-22 18:17:22', 2, 'Nissan', 'Sunny', 'completed');
insert into trips values ('driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 3, 'Nissan', 'Sunny', 'completed');
insert into trips values ('driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 2, 'Toyota', 'Crown', 'tentative');
insert into trips values ('bullet@concorde.com', 'Pasir Ris Park', 'Woodlands St 9', '2017-10-06 12:44:47', 1, 'Ferrari', 'California', 'tentative');

insert into bids values ('nondriver@sit.com', 'Blk 122 Punggol West Way', 'Sengkang St 12', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2015-12-22 18:17:22', 1, 3.00, 'cancelled');
insert into bids values ('nondriver@sit.com', 'Blk 122 Punggol East Way', 'Sengkang St 12', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 1, 3.10, 'completed');
insert into bids values ('passenger@sit.com', 'Punggol Eastgate', 'Sengkang St 14', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 2, 3.20, 'completed');
insert into bids values ('nondriver@sit.com', 'Changi Village Hawker Centre', 'Sengkang East Drive', 'driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 1, 5.50, 'pending');
insert into bids values ('passenger@sit.com', 'Changi Drive 12', 'Sengkang Mall', 'driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 2, 7.50, 'pending');
insert into bids values ('nondriver@sit.com', 'Pasir Ris MRT', 'Woodlands Bus Depot', 'bullet@concorde.com', 'Pasir Ris Park', 'Woodlands St 9', '2017-10-06 12:44:47', 1, 15.50, 'pending');