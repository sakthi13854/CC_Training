//binary tree with include tranverse tree
import java.util.*;
public class  Main 
{
    static class  Node 
    {
        int data;
        Node left;
        Node right;
        Node(int data)
        {
            this.data=data;
            this.left=null;
            this.right=null;
        }
    }
    Node root;
    Node insert(Node root,int key)
    {
       if(root==null)
       {
           return new Node(key);
       }
       if(key<root.data)
      
           root.left=insert(root.left,key);
       else if(key>root.data)
            root.right=insert(root.right,key);
       //else 
       return root;
    }
    void inorder(Node root)
    {
        if (root==null)
        return;
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
        
    }
    void preorder(Node root)
    {
        if (root==null)
        return;
        System.out.print(root.data +" ");
        preorder(root.left);
        preorder(root.right);
    }
    void postorder(Node root)
    {
        if (root==null)
        return;
        postorder(root.left);
        postorder(root.right);
        System.out.print(root.data+" ");
    }
    public static void main (String[] args) {
        Main m=new Main();
        m.root = m.insert(m.root, 2);
        m.root = m.insert(m.root, 3);
        m.root = m.insert(m.root, 4);
        m.root = m.insert(m.root, 1);
        m.root = m.insert(m.root, 5);
                
        m.inorder(m.root);
        System.out.println();

        m.preorder(m.root);
        System.out.println();
m.postorder(m.root);

    }
}