#include <stdio.h>

typedef struct Employee{
    char name[50];
    int emp_id;
    int experience;
}acer ;

int main(){
    int n,i;
    scanf("%d",&n);
    acer e[n];
    for (i=0;i<n;i++){
        scanf("%s%d%d",e[i].name,&e[i].emp_id,&e[i].experience);
    }
    for(i=0;i<n;i++){
        if(experience>2 && experience<5){
            printf("Experienced Canditates are :%s\n%d",e[i].name,s[i].emp_id);
        }
    }
}