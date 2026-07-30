//imp of stack using queue
import java.util.*;
public class  implement_stack_using_queue
{
    public static class stack
    {
    Queue<Integer>s1=new LinkedList<>(); 
     void push(int data)
    {
        s1.add(data);
        int i;
        int size=s1.size();
        for(i=0;i<size-1;i++)
        {
        s1.add(s1.peek());
        s1.poll();
        }
    } 
    void pop()
    {
        if (!s1.isEmpty())
            s1.poll();
    }
   int top()
    {
      if (!s1.isEmpty())
      
          return s1.peek();
          return 0 ;
    }
    int size()
    {
        return s1.size();
    }
    }
    public static void main(String[]args)
    {
       stack q=new stack();
       q.push(1);
       q.push(2);
       q.push(3);
       q.push(4);
       q.pop();
       System.out.println(q.top());
       q.pop();
    System.out.println(q.top());
       System.out.println(q.size());
       
    }
}