#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fptr;

   fptr = fopen("dataset.txt", "w");
    if (fptr == NULL) {
        printf("Error: File could not be created.\n");
        return 1;
    }

    fprintf(fptr, "ID: %d, Score: %.2f\n", 101, 94.50);
    fprintf(fptr, "ID: %d, Score: %.2f\n", 102, 88.25);
    fclose(fptr); // Always close the file stream

    fptr = fopen("dataset.txt", "r");
    if (fptr == NULL) {
        printf("Error: File could not be opened for reading.\n");
        return 1;
    }

 char buffer[100];
    printf("--- File Contents ---\n");
    while (fgets(buffer, sizeof(buffer), fptr) != NULL) {
        printf("%s", buffer);
    }
    printf("%ld\n",ftell(fptr));

    // 5. Close the file stream
    fclose(fptr);
    return 0;
}