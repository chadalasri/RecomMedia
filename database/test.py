
#python3 and up
exec(open("database.py").read())

#below python3 
#execfile("database.py")

#establish connection
connection = open_DBConnection()

set_data(connection, "v show", "tv show", 1, True)
set_data(connection, "v show", "movie", 2)
set_data(connection, "v show", "short film", 3, True)
set_data(connection, "b movie", "movie", 4)
set_data(connection, "b show", "movie", 5)
set_data(connection, "d show", "anime", 6)


stuff = num_items(connection)
print(stuff)

delete_data(connection, 4)
stuff = num_items(connection)
print(stuff)

stuff = get_by_name(connection, "v show")
print(stuff)

stuff = get_next(connection)
print(stuff)

stuff = get_by_id(connection, 6)
print(stuff)

stuff = get_by_mediaType(connection, "movie")
print(stuff)

stuff = get_all(connection)
print(stuff)

set_data_liked(connection, 6)
stuff = get_by_liked(connection)
print(stuff)

close_DBConnection(connection)