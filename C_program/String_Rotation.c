#include <stdio.h>
#include <string.h>
int main()
{
    int n,i,j,rot;
    char s[50];
    scanf("%s",&s);
    n = strlen(s);
    scanf("%d",&rot);
    while(rot --){
        char temp = s[0];
        for(i =0;i<n;i++)
        s[i]=s[i+1];
        s[n-1] = temp;
    }
    printf("%s",s);

}