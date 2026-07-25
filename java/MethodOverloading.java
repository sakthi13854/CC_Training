import java.util.*;
class operations
{
    static int add(int a,int b)
    {
        return a+b;
    }
    static int add(int a,int b,int c)
    {
        return a+b+c;
    }
    static int add(int a,int b,int c,int d)
    {
        return a+b+c+d;
    }
}
public class MethodOverloading
{
	public static void main(String[] args) {
	    operations ops=new operations();
	    Scanner sc=new Scanner(System.in);
	    System.out.println(ops.add(sc.nextInt(),sc.nextInt()));
	    System.out.println(ops.add(sc.nextInt(),sc.nextInt(),sc.nextInt()));
	    System.out.println(ops.add(sc.nextInt(),sc.nextInt(),sc.nextInt(),sc.nextInt()));
	}
}