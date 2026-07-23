import java.util.*;

public class Calandar
{
    public static void main(String[] args) {
 	    int d,m,y,sum =0;
	  Scanner sc=new Scanner(System.in);
	  d=sc.nextInt();
	  m=sc.nextInt();
	  y=sc.nextInt();
	  switch(m)
	  {
	   case 1:sum+=31;
	   case 2:if((y%4==0)&&(y%100!=0)||(y%400==0))
	   sum+=29;
	   else
	   sum+=28;
	   case 3:sum+=31;
	   case 4:sum+=30;
	   case 5:sum+=31;
	   case 6:sum+=30;
	   case 7:sum+=31;
	   case 8:sum+=31;
	   case 9:sum+=30;
	   case 10:sum+=31;
	   case 11:sum+=30;
	   case 12:sum+=31;
	  }
	  sum=sum-d;
	  System.out.println("Remaining days:"+" "+sum);
	  if((y%4==0)&&(y%100!=0)||(y%400==0))
	  System.out.println("Completed days:"+" "+(366-sum));
	  else
	  System.out.println("Completed days:"+" "+(365-sum));
	  }
}