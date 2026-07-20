#include<stdio.h>
void add(int *a,int n)
{
    int i;
   for(i=0;i<n;i++)
    printf("%d ",*(a+i));
}
int main()
{
    int n,i;
    scanf("%d",&n);
    int arr[n];
    for(i=0;i<n;i++)
    scanf("%d",&arr[i]);
    add(arr,n);
}