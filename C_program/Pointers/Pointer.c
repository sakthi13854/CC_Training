#include <stdio.h>

int main(){
    int a,*b,**c;
    scanf("%d",&a);
    b = &a;
    c = &b;
    printf("Value of A:%d\n",a);
    printf("Address of A:%d\n",&a);
    printf("Address of B:%d\n",b);
    printf("Value pointed by B:%d\n",*b);
    printf("Value Pointed by C:%d\n",*c);
    printf("Value Pointed by C:%d\n",**c);
    printf("Address of A:%d\n",c);

}