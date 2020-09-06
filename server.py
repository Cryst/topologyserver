import socketserver
from classes import CustomHandler
import json
import string
import socket
from napalm import get_network_driver # pip install napalm==2.3.2
from napalm.base.exceptions import ConnectionException
import os 

PORT = 9090
deviceslist = 'devices.txt'



def connect(ipaddres, login, password):
    driver = get_network_driver('ios')
    ssh = driver(ipaddres, login, password)
    ssh.open()
    d_facts = ssh.get_facts()
    d_output = ssh.get_mac_address_table()
    d_ip = ssh.get_interfaces_ip()
    d_lldp = ssh.get_lldp_neighbors()
    ssh.close()
    namejson.append(dict(name=d_facts["fqdn"], ipv4=ipaddres.rstrip() ))
    #print("{ \"facts\": "+json.dumps(d_facts["fqdn"], indent=4)+",")
    #print("\"mac_address_table\": "+json.dumps(d_output, indent=4)+",")
    #print("\"ios_ip\": "+json.dumps(d_ip, indent=4)+",")
    #print("\"lldp\": "+json.dumps(d_lldp, indent=4)+"}")
    

#data collector
namejson = list();
lldpjson = list();
with open(deviceslist,'r') as switch_db:
    for switch in switch_db:
    #set up to connect to a switch from switch_db
        try:
            connect(switch, 'artur', 'cisco')
            print(f'Data collected from {switch}') 
        except ConnectionException:
            print(f'Could not connect to {switch}') 
            #resolve ipaddresses
            fqdn = socket.getfqdn(switch.rstrip())
            namejson.append(dict(name=fqdn, ipv4=switch.rstrip() ))
        except:
            print(f'Login error {switch}')


#save collected data
lldpjson.append(dict(source="S2.example.com", target="S5.example.com", count=710 ))
datajson = dict(nodes=namejson, links=lldpjson)
with open('frontend/data_tmp.json', 'w') as f:
    json.dump(datajson, f)
print(json.dumps(datajson, indent=4))


#change working directory and run HTTP server
os.chdir("frontend")
httpd = socketserver.ThreadingTCPServer(('', PORT),CustomHandler)
while True:
    try:
        print("HTTP server started")
        httpd.serve_forever()
    except Exception:
        pass 
    else:
        break
