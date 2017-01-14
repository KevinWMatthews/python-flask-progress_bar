import socket
address = "127.0.0.1"
port = 10000
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((address, port))

print sock.recv(512)

sock.close
