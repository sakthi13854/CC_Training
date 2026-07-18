#include <stdio.h>
#include <string.h>
int main()
{
    int n,left,right;
    left = 0;
    char s[50];
    scanf("%s",&s);
    n = strlen(s);
    right = n-1;
    while(left<right){
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left ++;
        right --;
    }
    printf("%s",s);

}