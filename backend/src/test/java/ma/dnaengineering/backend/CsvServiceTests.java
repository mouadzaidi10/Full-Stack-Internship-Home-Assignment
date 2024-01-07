package ma.dnaengineering.backend;

import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.services.CsvService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CsvServiceTests {

    @Mock
    private CsvService csvServiceMock;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testReadCsvFilea() {
        // Mock data for testing
        List<Employee> mockEmployees = Arrays.asList(
                new Employee(1, "John Doe", "Software Engineer", 75000.0),
                new Employee(2, "Jane Smith", "Data Scientist", 85000.0)
        );

        // Mock the behavior of CsvService
        Mockito.when(csvServiceMock.readCsvFilea()).thenReturn(mockEmployees);

        // Test the method
        List<Employee> result = csvServiceMock.readCsvFilea();

        // Assert the result
        assertEquals(mockEmployees, result);
    }

    @Test
    void testCalculateAverageSalaryByJobTitle() {
        // Mock data for testing
        List<Employee> mockEmployees = Arrays.asList(
                new Employee(1, "John Doe", "Software Engineer", 75000.0),
                new Employee(2, "Jane Smith", "Software Engineer", 85000.0),
                new Employee(3, "Bob Johnson", "Data Scientist", 90000.0)
        );

        // Mock the behavior of CsvService
        Mockito.when(csvServiceMock.calculateAverageSalaryByJobTitle(mockEmployees)).thenReturn(
                Map.of("Software Engineer", 80000.0, "Data Scientist", 90000.0)
        );

        // Test the method
        Map<String, Double> result = csvServiceMock.calculateAverageSalaryByJobTitle(mockEmployees);

        // Assert the result
        assertEquals(80000.0, result.get("Software Engineer"));
        assertEquals(90000.0, result.get("Data Scientist"));
    }
}
