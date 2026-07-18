#include <stdio.h>

int main()
{
    int n,i;
    scanf("%d",&n);
    int arr[n];
    //140,120,90,50,0
    for(i =0;i<n;i++)
    scanf("%d",&arr[i]);
    int result[n];
    int rsum = 0;
    for( i = 0;i<5;i++){
        rsum += arr[i];
    }
    for( i = 0;i<5;i++){
        rsum -= arr[i];
        result[i] = rsum;
    }
    for (i =0;i<n;i++)
    printf("%d ",result[i]);

    return 0;
}