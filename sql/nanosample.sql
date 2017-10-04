insert into cars values 
	('Toyota', 'Crown'),
	('Ferrari', 'California'),
	('Nissan', 'Sunny');

insert into users (email, name, license_plate, company, model) values 
	('driver@drive.com', 'Road Runner', 'ABS7894A', 'Toyota', 'Crown'),
	('bullet@concorde.com', 'Baby', 'XXX1234X', 'Ferrari', 'California');

insert into users (email, name) values 
	('passenger@sit.com', 'Monsieur Potato'),
	('nondriver@sit.com', 'Madame Potato');

insert into languages values 
	('driver@drive.com', 'English'),
	('driver@drive.com', 'Chinese'),
	('bullet@concorde.com', 'Urdu');

insert into trips values 
	('driver@drive.com', 'Tanah Merah Station', '30 Havelock Rd', '2015-10-25 08:54:59', 1, 'Nissan', 'Sunny', 'completed'),
	('driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2015-12-22 18:17:22', 2, 'Nissan', 'Sunny', 'completed'),
	('driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 3, 'Nissan', 'Sunny', 'completed');

create function init_car () returns trigger as $$
	begin
	if not(new.company is null and new.model is null and new.status is null) then
		return null;
	else
		new.company = (select u.company from users u where new.id = u.email);
		new.model = (select u.model from users u where new.id = u.email);
		new.status = 'tentative';
		return new;
	end if;
	end; $$ language plpgsql;

create trigger init_car before insert on trips
for each row execute procedure init_car();

insert into trips (id, origin, dest, ride_time, space_for) values
	('driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 3),
	('bullet@concorde.com', 'Pasir Ris Park', 'Woodlands St 9', '2017-10-06 12:44:47', 1);

insert into bids values 
	('nondriver@sit.com', 'Zion Rd', 'River Valley High School', 'driver@drive.com', 'Tanah Merah Station', '30 Havelock Rd', '2015-10-25 08:54:59', 1, 7.20, 'completed'),
	('nondriver@sit.com', 'Blk 122 Punggol West Way', 'Sengkang St 12', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2015-12-22 18:17:22', 1, 3.00, 'cancelled'),
	('nondriver@sit.com', 'Blk 122 Punggol East Way', 'Sengkang St 12', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 1, 3.10, 'completed'),
	('passenger@sit.com', 'Punggol Eastgate', 'Sengkang St 14', 'driver@drive.com', 'Punggol Promenade', 'Sengkang Ave 5', '2016-06-22 19:10:25', 2, 3.20, 'completed'),
	('passenger@sit.com', 'Changi Drive 12', 'Sengkang Mall', 'driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 1, 7.50, 'accepted');

create function init_bid() returns trigger as $$
	begin
	if new.status is not null then
		return null;
	else
		new.status = 'pending';
		return new;
	end if;
	end; $$ language plpgsql;

create trigger init_bid before insert on bids
	for each row execute procedure init_bid();

insert into bids (p_id, p_origin, p_dest, d_id, d_origin, d_dest, ride_time, num_riders, price) values
	('nondriver@sit.com', 'Changi Village Hawker Centre', 'Sengkang East Drive', 'driver@drive.com', 'Changi Airport T1', 'Sengkang Ave 5', '2017-10-06 11:05:13', 2, 5.50),
	('nondriver@sit.com', 'Pasir Ris MRT', 'Woodlands Bus Depot', 'bullet@concorde.com', 'Pasir Ris Park', 'Woodlands St 9', '2017-10-06 12:44:47', 1, 15.50);