import java.util.Arrays;
import java.util.Comparator;

class Product {
    int productId;
    String productName;
    String category;

    Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    public void display() {
        System.out.println("ID: " + productId +
                ", Name: " + productName +
                ", Category: " + category);
    }
}

public class EcommerceSearch {

    // Linear Search
    public static Product linearSearch(Product[] products, int targetId) {
        for (Product p : products) {
            if (p.productId == targetId) {
                return p;
            }
        }
        return null;
    }

    // Binary Search
    public static Product binarySearch(Product[] products, int targetId) {
        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (products[mid].productId == targetId) {
                return products[mid];
            }

            if (products[mid].productId < targetId) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(104, "Laptop", "Electronics"),
                new Product(101, "Phone", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(102, "Watch", "Accessories"),
                new Product(105, "Bag", "Fashion")
        };

        int searchId = 103;

        // Linear Search
        Product result1 = linearSearch(products, searchId);

        System.out.println("Linear Search Result:");
        if (result1 != null)
            result1.display();
        else
            System.out.println("Product not found");

        // Sort array for Binary Search
        Arrays.sort(products, Comparator.comparingInt(p -> p.productId));

        Product result2 = binarySearch(products, searchId);

        System.out.println("\nBinary Search Result:");
        if (result2 != null)
            result2.display();
        else
            System.out.println("Product not found");
    }
}