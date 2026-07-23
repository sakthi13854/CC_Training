import java.util.*;

public class Main
{
    static int min(int a,int b,int c,int d)
    {
        int e= a<b?a:b;
        int f=c<d?c:d;
        return e<f?e:f;
    }
 	public static void main(String[] args) {
 	    int n,i,j,ans;
	  Scanner sc=new Scanner(System.in);
	  n=sc.nextInt();
	  for(i=0;i<(2*n)-1;i++,System.out.println())
	  for(j=0;j<(2*n)-1;j++)
	  {
	      ans=min(i,j,(2*n-2)-i,(2*n-2)-j);
	      System.out.print(n-ans);
	  }
	  }
}