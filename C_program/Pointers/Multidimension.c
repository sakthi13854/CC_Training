#include <stdio.h>

int main(){
    int n,i;
    scanf("%d",&n);
    int arr[n];
    int *a;
    a = &arr[0];
    for(i=0;i<n;i++){
        scanf("%d",&arr[i]);
    }
    for ( i = 0; i < n; i++)
    {
        printf("%d",*(a+i));
    }
    
}