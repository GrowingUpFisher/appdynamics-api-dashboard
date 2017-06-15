Instructions:

- Default installation
- start using $> redis-server
- cli         $> redis-cli
- to stop     send SIGINT to server process
- Running on localhost:6379
- default max clients is 128
- 4 clients connected corresponding to 4 Logstash workers subscribed to Redis port

- info
# Server
redis_version:3.2.9
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:d97708fd9e007be7
redis_mode:standalone
os:Darwin 16.6.0 x86_64
arch_bits:64
multiplexing_api:kqueue
gcc_version:4.2.1
process_id:37034
run_id:e911653484e7ab6a760f853d039ad623970c1edf
tcp_port:6379
uptime_in_seconds:220922
uptime_in_days:2
hz:10
lru_clock:4383452
executable:/Users/dbasak/redis-server
config_file:

# Clients
connected_clients:4
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0

# Memory
used_memory:1061056
used_memory_human:1.01M
used_memory_rss:1519616
used_memory_rss_human:1.45M
used_memory_peak:1210544
used_memory_peak_human:1.15M
total_system_memory:17179869184
total_system_memory_human:16.00G
used_memory_lua:49152
used_memory_lua_human:48.00K
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
mem_fragmentation_ratio:1.43
mem_allocator:libc

# Persistence
loading:0
rdb_changes_since_last_save:17076
rdb_bgsave_in_progress:0
rdb_last_save_time:1497334754
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:-1
rdb_current_bgsave_time_sec:-1
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok

# Stats
total_connections_received:892
total_commands_processed:2602306
instantaneous_ops_per_sec:36
total_net_input_bytes:134491908
total_net_output_bytes:10465910
instantaneous_input_kbps:1.83
instantaneous_output_kbps:0.05
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
evicted_keys:0
keyspace_hits:3358
keyspace_misses:859518
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:0
migrate_cached_sockets:0

# Replication
role:master
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:47.65
used_cpu_user:56.90
used_cpu_sys_children:0.00
used_cpu_user_children:0.00

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=4,expires=0,avg_ttl=0


