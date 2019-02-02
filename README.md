# nodecpp

This wil compile and run main.cpp on a filechange from main.cpp

It will run:

```bash
g++ main.cpp -o main
./main
```

# install

```bash
npm i . -g
```
or with npm 

```bash
npm i nodecpp -g
```

# run

You need to have a file main.cpp in the directory
```c++
#include <iostream>

int main() {
    std::cout << "Hallo, nodecpp" << std::endl;
    return 0;
}
```

than run

```bash
nodecpp
```


Thats it. For now it will not watch other files