/*
create function init_car () returns trigger as $$
	begin
	if not(new.company is null and new.model is null and new.status is null 
	and new.space_for > 0) and new.rideTime < now() then
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
*/

/* triggers still needed:

*/

create table cars(
	company varchar(64),
	model varchar(64),
	primary key(company, model)
);

create table users(
	email varchar(64) primary key,
	name varchar(64) not null,
	image_path varchar(64) default 'images/default.jpg' not null,
	license_plate varchar(8),
	company varchar(64),
	model varchar(64),
	foreign key (company, model) references cars(company, model),
	check((license_plate is null and company is null and model is null) 
	or not (license_plate is null or company is null or model is null))
);

create table languages(
	email varchar(64) references users(email),
	language varchar(64),
	primary key(email, language)
);

create table trips(
	id varchar(64) references users(email),
	origin varchar(64),
	dest varchar(64),
	ride_time timestamp,
	space_for int not null check(space_for > 0),
	company varchar(64),
	model varchar(64),
	status text check(status in ('tentative', 'ongoing', 'completed', 'cancelled')),
	primary key(id, origin, dest, ride_time),
	foreign key(company, model) references cars(company, model)
);

create table bids(
	p_id varchar(64) references users(email),
	p_origin varchar(64),
	p_dest varchar(64),
	d_id varchar(64) not null,
	d_origin varchar(64) not null,
	d_dest varchar(64) not null,
	ride_time timestamp not null,
	num_riders int not null,
	price decimal(10,2) not null,
	status text check(status in ('accepted', 'pending', 'completed', 'cancelled', 'rejected', 'no show')),
	foreign key(d_id, d_origin, d_dest, ride_time) 
	references trips(id, origin, dest, ride_time) on delete cascade on update cascade,
	primary key(p_id, p_origin, p_dest, d_id, d_origin, d_dest, ride_time),
	check(p_id != d_id)
);