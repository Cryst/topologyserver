import http.server
import socketserver
import re
from icmplib import ping, multiping, traceroute, Host, Hop





class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if None != re.search('/api/ping/*', self.path):
            ipaddr = ""+self.path.split('/')[-1]
            print(self.path.split('/'))
            #This URL will trigger our sample function and send what it returns back to the browser
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write( str(ping(ipaddr, count=3, interval=0.2, timeout=1).avg_rtt).encode() ) #call sample function here
            return 
        if None != re.search('/api/isalive/*', self.path):
            ipaddr = ""+self.path.split('/')[-1]
            print(self.path.split('/'))
            #This URL will trigger our sample function and send what it returns back to the browser
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write( str(ping(ipaddr, count=3, interval=0.2, timeout=1).is_alive).encode() ) #call sample function here
            return
        if None != re.search('/api/mult/*', self.path):
            num1 = float(self.path.split('/')[-1])
            num2 = float(self.path.split('/')[-2])
            #This URL will trigger our sample function and send what it returns back to the browser
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write(str(num1*num2).encode()) #call sample function here
            return
        else:
            #serve files, and directory listings by following self.path from
            #current working directory
            http.server.SimpleHTTPRequestHandler.do_GET(self)
