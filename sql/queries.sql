/* Languages spoken */
select language from languages where email = MY_EMAIL;

/* All trips driven and money earned*/
select t.origin, t.dest, t.ride_time, coalesce(sum(b.price), 0.00) earned from trips t left join bids b on
	t.id = b.d_id and t.origin = b.d_origin and t.dest = b.d_dest and t.ride_time = b.ride_time and b.status = 'completed'
where t.id = MY_EMAIL and t.status = 'completed'
group by t.id, t.origin, t.dest, t.ride_time;

/* All trips taken */
select p_origin, p_dest, ride_time, price from bids where r_id = MY_EMAIL and status = 'completed';

/* All relevant trips that can be bid for (ride has yet to start, not driven by oneself, and still has space left*/
select t.id, t.origin, t.dest, t.ride_time from trips t 
where t.status = 'tentative' and t.id != MY_ID and 
	coalesce(sum(select b.num_riders from bids b where b.d_id = d_id and b.d_origin = t.d_origin and b.d_dest = t.d_dest
	and b.ride_time = t.ride_time and b.status = 'accepted'), 0) + NUM_RIDERS <= t.space_for
	and (t.origin like '%MY_ORIGIN%' or t.dest like '%MY_DEST%');

/* All active bids for a ride */
