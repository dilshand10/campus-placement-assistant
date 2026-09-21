# Sample Placement Eligibility Rules

> These rules apply only to the synthetic/sample dataset in this project. They do not represent real company recruitment rules.

## Eligibility inputs

A sample eligibility check uses exactly these student inputs:
1. Branch
2. CGPA
3. Current number of backlogs

## Eligibility logic

A student is **sample-eligible** for a company when all three conditions are true:

- The student's branch is listed in the company's eligible branches.
- The student's CGPA is greater than or equal to the company's minimum CGPA.
- The student's current backlogs are less than or equal to the company's maximum allowed backlogs.

If any one condition is false, the student is not sample-eligible for that company.

## Boundary rules

- CGPA exactly equal to the minimum CGPA **meets** the CGPA criterion.
- Backlogs exactly equal to the maximum allowed backlogs **meets** the backlog criterion.
- A branch not listed in the eligible branches **does not meet** the branch criterion.
- Do not assume that a similar branch name is equivalent to a listed branch unless the knowledge source explicitly says so.

## Example

Student:
- Branch: CSE
- CGPA: 7.2
- Backlogs: 0

The student meets the sample criteria for:
- TechNova (Sample)
- CloudCore (Sample)
- WebStack (Sample)
- SecureNet (Sample)
- ProductLabs (Sample)
- AnalyticsHub (Sample)

The student does not meet the sample CGPA requirement for:
- DataSphere (Sample)
- AIWorks (Sample)
- FinTechLab (Sample)

The student meets the sample criteria for CloudCore because CSE is eligible, 7.2 is at least 7.0, and 0 backlogs is within the maximum of 1.

## Response behavior

When calculating sample eligibility:
1. Show the student's branch, CGPA, and backlogs.
2. Show the company's relevant criteria.
3. Check branch, CGPA, and backlogs separately.
4. Explain which criterion passes or fails.
5. Label the result as sample/demo information.
6. Do not claim that the result represents an actual company recruitment decision.
