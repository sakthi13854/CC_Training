#include <stdio.h>
#include<iostream>
using namespace std;
class abc
{
    public :
    void add(int a,int b)
    {
        cout<<a+b<<std::endl;
    }
    void add(int a,int b,int c)
    {
        cout<<a+b+c<<std::endl;
    }
    void add(int a,int b,int c,int d)
    {
        cout<<a+b+c+d<<std::endl;
    }
};
int main()
{
    abc d;
    d.add(1,2);
    d.add(6,7,8);
    d.add(9,0,2,6);
    return 0;
}