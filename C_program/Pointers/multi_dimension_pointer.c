#include <stdio.h>

int main(){
    int n,i;
    scanf("%d",&n);
    int arr[n][n];
    int *a;
    a = &arr[0][0];
    for(i=0;i<n;i++){
        for (int j = 0;j<n;j++){
            scanf("%d",&arr[i][j]);
        }
        
    }
    for ( i = 0; i < n; i++,printf("\n"))
        for (int j =0;j<n;j++){
            printf("%d ",*(a+(i*n)+j));
        }
        
    
}