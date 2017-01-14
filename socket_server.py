import socket
address = "127.0.0.1"
port = 10000
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
serversocket.bind((address, port))
serversocket.listen(5)

(clientsocket, address) = serversocket.accept()
print ("connection accepted")
clientsocket.send("hi!")
clientsocket.close()
serversocket.close()
