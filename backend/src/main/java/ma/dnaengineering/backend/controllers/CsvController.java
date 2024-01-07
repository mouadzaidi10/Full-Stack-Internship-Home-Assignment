package ma.dnaengineering.backend.controllers;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.services.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
public class CsvController {

    private final CsvService csvService;

    @Autowired
    public CsvController(CsvService csvService) {
        this.csvService = csvService;
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return csvService.readCsvFilea();
    }

    @GetMapping("/average-salary")
    public Map<String, Double> getAverageSalaryByJobTitle() {
        List<Employee> employees = csvService.readCsvFilea();
        return csvService.calculateAverageSalaryByJobTitle(employees);
    }

    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processCsv(@RequestPart("file") MultipartFile file) {
        try {
            List<Employee> employees = csvService.readCsvFile(file);
            Map<String, Double> jobSummary = csvService.calculateAverageSalaryByJobTitle(employees);

            Map<String, Object> result = new HashMap<>();
            result.put("employees", employees);
            result.put("jobSummary", jobSummary);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error processing file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


}
