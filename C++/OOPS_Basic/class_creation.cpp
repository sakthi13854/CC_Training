#include <iostream>
using namespace std;

class Add{
    public:
    void caculate( int a, int b){
        cout << a+b << endl;
    }
};

int main(){
    int a,b,c,d;
    cin >> a;
    cin >> b;
    cin >> c;
    cin >> d;
    Add no;
    no.caculate(b,c);

}