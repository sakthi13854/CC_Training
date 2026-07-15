#include <stdio.h>

int main(){
	int n;
	scanf("%d", &n);
	printf("%d\n", (n % 9 == 0) ? 9 : (n % 9));	
}