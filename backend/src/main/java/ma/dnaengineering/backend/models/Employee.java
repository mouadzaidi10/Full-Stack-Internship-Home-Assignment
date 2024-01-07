package ma.dnaengineering.backend.models;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private long id;
    private String employeeName;
    private String jobTitle;
    private double salary;
}
