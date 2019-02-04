#include <iostream>

uint8_t staticBSSID[3][6] = {{0xFC, 0xEC, 0xDA, 0x87, 0xE8, 0x5A},
                             {0xF4, 0x06, 0x8D, 0x67, 0x65, 0x62},
                             {0xFE, 0xEC, 0xDA, 0x87, 0xD3, 0x24}};

int staticRATE[3] =     {   10,
                             3,
                             1};

int points = 0;

int macInStatic(uint8_t mac[]) {
    int found = -1;
    for (int macNr = 5; macNr >= 0; --macNr) {
        int macCount = 0;
        for (int macPosition = 0; macPosition < 2; ++macPosition) {
            if (mac[macPosition] == staticBSSID[macNr][macPosition]) {
                macCount++;
                if (macCount == 2) {
                    found = macNr;
                }
            } else {
                break;
            }
        }
    }
    return found;
}

void compareOne() {
    uint8_t mac[6] = {0xFC, 0xEC, 0xDA, 0x87, 0xE8, 0x5A};
    std::cout << "size " << sizeof(mac) << std::endl;
    int out = macInStatic(mac);
    if(out > -1) {
        std::cout << "gevonden index " << out << std::endl;
    } else {
        std::cout << "oops niet gevonden";
    }
    std::cout << "Hallo, dedup.cpp....." << std::endl;
}

void compareAll() {
    uint8_t macs[2][6] = {{0xFC, 0xEC, 0xDA, 0x87, 0xE8, 0x5A}, {0xFC, 0xEC, 0xDA, 0x87, 0xE8, 0x5A}};
    std::cout << "size macs " << sizeof(macs) / 6 << std::endl;




//    int out = macInStatic(mac);
//    if(out > -1) {
//        std::cout << "gevonden index " << out << std::endl;
//    } else {
//        std::cout << "oops niet gevonden";
//    }
//    std::cout << "Hallo, dedup.cpp....." << std::endl;
}




int main() {
//    compareOne();
    compareAll();
    return 0;
}