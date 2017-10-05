/* Languages spoken */
select language from languages where email = MY_ID;

/* All trips driven and money earned */
select t.origin, t.dest, t.ride_time, coalesce(sum(b.price), 0.00) earned from trips t left join bids b on
	t.id = b.d_id and t.origin = b.d_origin and t.dest = b.d_dest and t.ride_time = b.ride_time and b.status = 'completed'
where t.id = MY_ID and t.status = 'completed'
group by t.id, t.origin, t.dest, t.ride_time
order by t.ride_time desc;

/* All trips taken */
select p_origin, p_dest, ride_time, price from bids where r_id = MY_ID and status = 'completed' order by ride_time desc;

/* All relevant trips that can be bid for (ride has yet to start, not driven by oneself, still has space left, and starting/ending in same place)*/
select t.id, t.origin, t.dest, t.ride_time from trips t 
where t.status = 'tentative' and t.id != MY_ID and 
	(select coalesce(sum(riders_so_far), 0) from 
    	(select b.num_riders riders_so_far from bids b where b.d_id = t.id and b.d_origin = t.origin 
    	and b.d_dest = t.dest and b.ride_time = t.ride_time and b.status = 'accepted') co_riders) + NUM_MY_RIDERS <= t.space_for
	and (t.origin like '%MY_ORIGIN%' or t.dest like '%MY_DEST%');

/* All tentative trips */
select origin, dest, ride_time, space_for from trips where id = MY_ID and status = 'tentative';

/* All pending bids for a tentative/ongoing trip */
select b.p_id, b.p_origin, b.p_dest, b.ride_time, b.price from bids b
where b.d_id = MY_ID and b.d_origin = MY_ORIGIN and b.d_dest = MY_DEST and b.ride_time = MY_RIDE_TIME and b.status = 'pending';

/* All accepted bids for a tentative/ongoing trip */
select b.p_id, b.p_origin, b.p_dest, b.ride_time, b.price from bids b
where b.d_id = MY_ID and b.d_origin = MY_ORIGIN and b.d_dest = MY_DEST and b.ride_time = MY_RIDE_TIME and b.status = 'accepted';

/* Insert new trip */
insert into trips (id, origin, dest, ride_time, space_for) values (MY_ID, MY_ORIGIN, MY_DEST, TRIP_TIME, NUM_SPACES)

/*  */