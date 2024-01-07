package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.models.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CsvService {

    private static final String CSV_FILE_PATH = "../data/employees.csv";

    public List<Employee> readCsvFilea() {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(CSV_FILE_PATH))) {
            br.readLine(); // Skip the first line

            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                Employee employee = new Employee();
                employee.setId(Long.parseLong(data[0].trim()));
                employee.setEmployeeName(data[1].trim());
                employee.setJobTitle(data[2].trim());
                employee.setSalary(Double.parseDouble(data[3].trim()));
                employees.add(employee);
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception based on your requirements
        }

        return employees;
    }



    public List<Employee> readCsvFile(MultipartFile file) {
        // Use the provided file instead of the hard-coded path
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            br.readLine(); // Skip the first line

            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                Employee employee = new Employee();
                employee.setId(Long.parseLong(data[0].trim()));
                employee.setEmployeeName(data[1].trim());
                employee.setJobTitle(data[2].trim());
                employee.setSalary(Double.parseDouble(data[3].trim()));
                employees.add(employee);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return employees;
    }

    public Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        Map<String, List<Double>> salaryMap = new HashMap<>();

        for (Employee employee : employees) {
            salaryMap.computeIfAbsent(employee.getJobTitle(), k -> new ArrayList<>()).add(employee.getSalary());
        }

        return salaryMap.entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        entry -> entry.getValue().stream().mapToDouble(Double::doubleValue).average().orElse(0.0)));
    }

}
