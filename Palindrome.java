import java.util.*;

public class Main {
    public static void main(String[] args) {
        String s;
        Scanner sc = new Scanner(System.in);
        s = sc.next();

        String temp = s;
        char temp1;
        char arr[] = s.toCharArray();

        int i = 0;
        int j = s.length() - 1;

        while (i < j) {
            temp1 = arr[i];
            arr[i] = arr[j];
            arr[j] = temp1;
            i++;
            j--;
        }

        String ans = new String(arr);

        System.out.println(temp);

        if (temp.equals(ans))
            System.out.println("Yes");
        else
            System.out.println("No");
    }
}