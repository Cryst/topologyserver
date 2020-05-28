#include <cstdio>
//#include <stdio.h> //replaced by cstdio
#include <cstdlib>
//#include <stdlib.h> //replaced by cstdlib
#include <iostream>
#include <pthread.h>
#include <memory>
#include <stdexcept>
#include <cstring>
//#include <string> //replaced by cstring
//test
//zmiana
#include <array>



int main()
{

    //std::cout << "bash return code: " << exec("snmpwalk -V >/dev/null 2>&1 ; echo $?"); // string /bin/bash $? command output (bash return code): "0"-ok, "1"-error lub "127"-command not found
    //std::cout << "system return code: " << system("snmpwalk -V >/dev/null 2>&1") << "\n"; // int system() return code: 0-ok, 256-error; 32512-command not found
    if (system("snmpwalk -V >/dev/null 2>&1")) {
        std::cout << "Please install snmpwalk! (sudo apt-get install snmp)\n";
        return 1;
    }
    std::cout << "hello from topologyserver daemon!\n";


    return 0;
}


//exec() source https://stackoverflow.com/a/478960 
std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);
    if (!pipe) {
        throw std::runtime_error("popen() failed!");
    }
    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}