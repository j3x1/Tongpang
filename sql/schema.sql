/*create function isAvailable(
	num_riders int, d_id varchar(64), d_origin varchar(64), d_dest varchar(64), ride_time timestamp
	)
returns boolean
as
$$
begin
    if num_riders <= (select t.space_for from trips t where t.id = d_id and t.origin = d_origin
    				and t.dest = d_dest and t.ride_time = ride_time and t.status = 'tentative') -
    				coalesce(sum(select b.num_riders from bids b where b.d_id = d_id and b.d_origin = d_origin
    				and b.d_dest = d_dest and b.ride_time = ride_time and b.status = 'accepted'), 0) then
    	return true;
    else
    	return false;
    end if;
end;
$$
language plpgsql;*/

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
	space_for int not null,
	company varchar(64) not null,
	model varchar(64) not null,
	status text check(status in ('tentative','ongoing','completed','cancelled')),
	primary key(id, origin, dest, ride_time),
	foreign key(company, model) references cars(company, model)
);

create table bids(
	p_id varchar(64) references users(email),
	p_origin varchar(64),
	p_dest varchar(64),
	d_id varchar(64),
	d_origin varchar(64),
	d_dest varchar(64),
	ride_time timestamp,
	num_riders int not null,
	price decimal(10,2) not null,
	status text check(status in ('accepted','pending','completed','cancelled')),
	foreign key(d_id, d_origin, d_dest, ride_time) 
	references trips(id, origin, dest, ride_time) on delete cascade on update cascade,
	primary key(p_id, p_origin, p_dest, d_id, d_origin, d_dest, ride_time),
	check(p_id != d_id)
);