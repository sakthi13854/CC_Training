#include <stdio.h>

int main(){
    char a ;
    scanf("%c",&a);
    switch(a){
        case 'a'...'z':printf("Lowercase\n");
        break;
        case 'A'...'Z':printf("Uppercase\n");
        break;
        case '0'...'9':printf("Number\n");
        break;
    }
    return 0;
}