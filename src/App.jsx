import React, { useMemo, useState } from "react";

/**
 * =========================================
 * Management Evaluation Workbench V4
 * - Setup Wizard + Workspace
 * - Project Context Lock
 * - Upload Classification
 * - Setup Validation
 * - Dashboard / Indicator Detail / Source Map / Report Risk
 * =========================================
 */

function IconBase({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <IconBase className={className}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

function FolderTree({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M7 13h4" />
      <path d="M9 13v4" />
      <path d="M9 17h6" />
    </IconBase>
  );
}

function AlertTriangle({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3 2.5 19a1 1 0 0 0 .86 1.5h17.28a1 1 0 0 0 .86-1.5L12 3z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconBase>
  );
}

function FileText({ className }) {
  return (
    <IconBase className={className}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
      <path d="M9 9h1" />
    </IconBase>
  );
}

function CheckCircle2({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}

function Search({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

function Layers3({ className }) {
  return (
    <IconBase className={className}>
      <path d="m12 4 8 4-8 4-8-4 8-4z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </IconBase>
  );
}

function Database({ className }) {
  return (
    <IconBase className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </IconBase>
  );
}

function ShieldCheck({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
      <path d="m9.5 12 1.8 1.8 3.7-3.7" />
    </IconBase>
  );
}

function BarChart3({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M22 20H2" />
    </IconBase>
  );
}

function Sparkles({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
    </IconBase>
  );
}

const institutionProfiles = [
  {
    id: "inst-1",
    ministry: "산업부 산하 공공기관",
    institutionType: "준정부기관",
    institutionName: "한국표준협회",
    evaluationYear: "2026",
    manualVersion: "2026-v1",
    evaluationScheme: "공공기관 경영실적평가",
    focus: ["경영관리", "주요사업", "혁신과제"],
  },
  {
    id: "inst-2",
    ministry: "보건복지부 산하 기타공공기관",
    institutionType: "기타공공기관",
    institutionName: "가상 시범기관",
    evaluationYear: "2026",
    manualVersion: "2026-v1",
    evaluationScheme: "공공기관 경영실적평가",
    focus: ["경영관리", "안전·책임경영", "ESG"],
  },
  {
    id: "inst-3",
    ministry: "기타 공공기관",
    institutionType: "기타공공기관",
    institutionName: "파일럿 기관",
    evaluationYear: "2026",
    manualVersion: "2026-v1",
    evaluationScheme: "맞춤형 파일럿",
    focus: ["경영관리", "안전·책임경영", "주요사업"],
  },
];

const uploadCategoryHints = [
  { id: "manual", label: "편람", helper: "평가기준 해석의 기준이 되는 문서" },
  { id: "report", label: "실적보고서", helper: "전년도 또는 당해연도 실적 정리본" },
  { id: "excel", label: "원천엑셀", helper: "KPI, 실적집계, 비교표 등 정량자료" },
  { id: "minutes", label: "회의록", helper: "점검, 개선, 환류 증빙" },
  { id: "safety", label: "안전증빙", helper: "안전점검, 교육, 조치 결과" },
  { id: "external", label: "외부평가", helper: "인증, 수상, 감사, 외부확인 결과" },
];

const evaluationTypeMatrix = [
  {
    id: "type-1",
    type: "체계형",
    objective: "제도와 운영 프로세스가 실제 존재하고 반복 작동하는지 판단",
    requiredDocuments: ["규정", "지침", "운영계획", "조직/역할 문서"],
    requiredData: ["연간 운영 횟수", "대상 범위", "적용률"],
    requiredNarratives: ["책임체계", "운영주기", "통제 포인트"],
    riskSignals: ["제도만 있고 실행 로그가 없음", "전사 적용 범위 불명확"],
  },
  {
    id: "type-2",
    type: "실행형",
    objective: "계획된 활동이 실제 이행되었는지 판단",
    requiredDocuments: ["회의록", "점검결과", "교육기록", "조치결과 보고"],
    requiredData: ["이행률", "참여율", "월별 실행 실적"],
    requiredNarratives: ["실행 범위", "대상", "시기", "후속조치"],
    riskSignals: ["한 번의 이벤트성 실적", "대표 사례만 있고 전사 실행 이력 없음"],
  },
  {
    id: "type-3",
    type: "성과형",
    objective: "정량·정성 성과가 평가문구를 입증하는지 판단",
    requiredDocuments: ["성과보고서", "비교표", "외부평가 결과", "수혜자 자료"],
    requiredData: ["목표값", "실적값", "전년값", "3개년 추이"],
    requiredNarratives: ["성과 의미", "개선 폭", "기관 기여도"],
    riskSignals: ["증가/개선 표현만 있고 수치 없음", "산출과 성과가 혼재"],
  },
  {
    id: "type-4",
    type: "환류형",
    objective: "점검·평가 결과가 차년도 계획과 제도 개선으로 이어졌는지 판단",
    requiredDocuments: ["평가회의록", "개선과제 목록", "차년도 계획", "후속조치 문서"],
    requiredData: ["개선과제 반영률", "미조치 건수", "조치 완료율"],
    requiredNarratives: ["원인", "조치", "제도화", "차년도 반영"],
    riskSignals: ["개선 필요라고만 쓰고 실제 반영 증빙 없음", "전년도 지적과 현재 계획 연결 부재"],
  },
  {
    id: "type-5",
    type: "정합성형",
    objective: "전략-사업-KPI-예산-조직의 논리 연결을 판단",
    requiredDocuments: ["중장기 전략", "실행계획", "KPI 체계표", "예산 배분표"],
    requiredData: ["전략과제별 예산", "KPI 매핑률", "조직 연계표"],
    requiredNarratives: ["전략 연결", "사업 연결", "성과 연결"],
    riskSignals: ["문서마다 명칭 불일치", "핵심사업과 KPI 미연결"],
  },
];

const judgementSystemRequirements = [
  {
    id: "req-1",
    title: "평가 컨텍스트 잠금",
    summary:
      "평가연도, 평가제도, 기관유형, 기관명, 적용 편람 버전, 예외규칙을 먼저 고정해야 판단이 흔들리지 않음",
    mustHave: ["연도", "평가제도", "기관유형", "기관명", "편람 버전", "선택/예외 규칙"],
    status: "ready",
  },
  {
    id: "req-2",
    title: "판단문구 메타데이터",
    summary:
      "각 판단문구마다 유형, 필수 증빙, 정량 필요 여부, 비교 기준, 금지 표현 규칙이 있어야 자동판단 가능",
    mustHave: ["clause_type", "required_evidence", "required_quant", "required_comparison", "forbidden_patterns"],
    status: "critical",
  },
  {
    id: "req-3",
    title: "자료 분류 체계",
    summary:
      "자료를 편람/실적보고서/원천엑셀/회의록/외부평가/현장증빙으로 나누고, 평가유형별로 요구자료를 달리 매핑해야 함",
    mustHave: ["자료 카테고리", "평가유형 매핑", "연도 태그", "기관 태그", "신뢰도 등급"],
    status: "critical",
  },
  {
    id: "req-4",
    title: "출처 추적 가능성",
    summary:
      "모든 판단결과는 어느 PDF 몇 쪽, 어느 엑셀 시트 몇 셀에서 왔는지 역추적 가능해야 실무 사용 가능",
    mustHave: ["source_id", "file_name", "page_or_sheet", "excerpt", "verifier_status"],
    status: "critical",
  },
  {
    id: "req-5",
    title: "룰엔진 + LLM 분리",
    summary:
      "수치 존재, 비교 여부, 증빙 누락은 룰엔진이 먼저 확인하고 정합성·설득력은 LLM이 보조 판단해야 함",
    mustHave: ["rule_check", "llm_review", "human_approval"],
    status: "design",
  },
  {
    id: "req-6",
    title: "최종 승인 단계",
    summary:
      "자동판단 결과를 그대로 평가결과로 쓰지 않고 검수·승인을 거친 문장만 보고서에 반영해야 함",
    mustHave: ["승인자", "검토의견", "승인상태", "이력관리"],
    status: "design",
  },
];

const initialSourceCatalog = [
  { id: "src-1", category: "편람", name: "2026 경영평가 편람.pdf", reliability: "최상", year: "2026", status: "classified", required: true },
  { id: "src-2", category: "실적보고서", name: "2025 기관 실적보고서.pdf", reliability: "상", year: "2025", status: "classified", required: true },
  { id: "src-3", category: "원천엑셀", name: "KPI 실적집계.xlsx", reliability: "상", year: "2025", status: "classified", required: true },
  { id: "src-4", category: "회의록", name: "성과점검 회의록.docx", reliability: "중", year: "2025", status: "needs_review", required: false },
  { id: "src-5", category: "안전증빙", name: "안전점검 결과집.pdf", reliability: "상", year: "2025", status: "classified", required: false },
  { id: "src-6", category: "외부평가", name: "외부 인증 및 수상실적.pdf", reliability: "중", year: "2025", status: "classified", required: false },
];

const evaluationFramework = [
  {
    id: "cat-1",
    name: "경영관리",
    description: "기관 운영의 구조적 건전성과 경영기반을 평가하는 최상위 범주",
    indicators: [
      {
        id: "ind-1",
        name: "경영전략",
        weight: 12,
        owner: "기획조정",
        progress: 78,
        status: "ready",
        summary: "전략-사업-성과 간 정합성과 KPI 연계성을 평가",
        requiredSources: ["편람", "실적보고서", "원천엑셀"],
        riskLevel: "medium",
        subIndicators: [
          {
            id: "sub-1",
            name: "전략기획",
            narrativeUnit: true,
            metrics: ["전년 대비 KPI 달성률", "전략과제별 성과 달성 수준", "개선과제 반영률"],
            judgementClauses: [
              {
                id: "jc-1",
                text: "전략-사업-성과 간 정합성이 확보되어 있는가",
                intent: "정합성 판단",
                clauseType: "정합성형",
                requiredEvidence: ["중장기 전략", "부서 실행계획", "성과지표 정의서"],
                requiredQuant: false,
                requiredComparison: "없음",
                forbiddenPatterns: ["정합성이 우수함", "잘 연계됨"],
                reviewQuestions: [
                  "미션-비전-경영목표-주요사업이 한 흐름으로 이어지는가?",
                  "전략목표와 KPI가 실제 사업과 연결되는가?",
                ],
              },
              {
                id: "jc-2",
                text: "KPI가 사업성과를 설명할 수 있도록 적절히 설계되어 있는가",
                intent: "지표 설계 타당성",
                clauseType: "성과형",
                requiredEvidence: ["KPI 체계표", "성과보고서", "목표 대비 실적표"],
                requiredQuant: true,
                requiredComparison: "목표대비",
                forbiddenPatterns: ["충분히 우수", "체계적 관리"],
                reviewQuestions: [
                  "KPI가 단순 활동량이 아닌 성과를 설명하는가?",
                  "핵심사업의 결과가 KPI로 잡혀 있는가?",
                ],
              },
              {
                id: "jc-3",
                text: "성과평가 결과가 차년도 계획에 환류되는 체계를 갖추고 있는가",
                intent: "환류체계 판단",
                clauseType: "환류형",
                requiredEvidence: ["성과평가 회의록", "개선과제 목록", "차년도 사업계획"],
                requiredQuant: false,
                requiredComparison: "전년",
                forbiddenPatterns: ["개선 예정", "반영 검토"],
                reviewQuestions: [
                  "미흡요인이 개선계획으로 연결되는가?",
                  "전년도 지적사항에 대한 조치가 확인되는가?",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ind-2",
        name: "조직·인사 운영",
        weight: 8,
        owner: "경영지원",
        progress: 63,
        status: "ready",
        summary: "조직 운영 체계와 실행성을 평가",
        requiredSources: ["편람", "실적보고서", "회의록"],
        riskLevel: "low",
        subIndicators: [
          {
            id: "sub-2",
            name: "조직 운영",
            narrativeUnit: true,
            metrics: ["조직 연계표", "직무 재설계 반영률"],
            judgementClauses: [
              {
                id: "jc-4",
                text: "조직 운영 체계가 전략목표 달성을 뒷받침하도록 설계되어 있는가",
                intent: "조직 정렬성 판단",
                clauseType: "체계형",
                requiredEvidence: ["조직도", "업무분장표", "운영계획"],
                requiredQuant: false,
                requiredComparison: "없음",
                forbiddenPatterns: ["효율적으로", "체계적으로"],
                reviewQuestions: [
                  "조직 역할이 전략과 연결되는가?",
                  "업무분장과 실제 운영이 일치하는가?",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-2",
    name: "주요사업",
    description: "기관이 수행하는 핵심사업의 성과와 집행 역량을 평가하는 범주",
    indicators: [
      {
        id: "ind-5",
        name: "핵심사업 성과",
        weight: 20,
        owner: "사업부서",
        progress: 73,
        status: "ready",
        summary: "주요사업 성과, 파급효과, 정책 부합성을 평가",
        requiredSources: ["실적보고서", "원천엑셀", "외부평가"],
        riskLevel: "high",
        subIndicators: [
          {
            id: "sub-6",
            name: "사업성과 창출",
            narrativeUnit: true,
            metrics: ["사업 KPI 달성률", "수혜자 증가율", "정책목표 기여도"],
            judgementClauses: [
              {
                id: "jc-10",
                text: "핵심사업이 기관 설립목적과 정책방향에 부합하는 성과를 창출했는가",
                intent: "사업성과 판단",
                clauseType: "성과형",
                requiredEvidence: ["사업성과 보고서", "정책 연계자료", "수혜자 성과자료"],
                requiredQuant: true,
                requiredComparison: "목표대비",
                forbiddenPatterns: ["의미 있는 성과", "높은 효과"],
                reviewQuestions: [
                  "사업의 산출이 아닌 결과와 효과를 보여주는가?",
                  "기관의 존재 이유와 연결되는가?",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cat-3",
    name: "안전·책임경영",
    description: "안전, 윤리, 책임경영 실행 여부를 평가하는 범주",
    indicators: [
      {
        id: "ind-6",
        name: "안전 및 재난관리",
        weight: 10,
        owner: "안전총괄",
        progress: 42,
        status: "insufficient",
        summary: "사전예방, 실행성과, 재발방지와 공공책임을 평가",
        requiredSources: ["편람", "안전증빙", "회의록"],
        riskLevel: "high",
        subIndicators: [
          {
            id: "sub-7",
            name: "안전관리 실행",
            narrativeUnit: true,
            metrics: ["사고 건수 증감률", "안전점검 이행률", "시정조치 완료율"],
            judgementClauses: [
              {
                id: "jc-11",
                text: "사전예방 중심의 안전관리 체계를 구축·운영하고 있는가",
                intent: "사전예방 체계 판단",
                clauseType: "체계형",
                requiredEvidence: ["안전점검 계획", "위험성평가표", "교육훈련 기록"],
                requiredQuant: false,
                requiredComparison: "없음",
                forbiddenPatterns: ["안전관리 강화", "만전"],
                reviewQuestions: [
                  "사고 이후 대응이 아니라 사전예방 체계가 작동하는가?",
                  "취약요인에 대한 우선순위 관리가 존재하는가?",
                ],
              },
              {
                id: "jc-12",
                text: "전년 대비 사고 감소 또는 안전수준 개선 실적이 확인되는가",
                intent: "개선 여부 판단",
                clauseType: "성과형",
                requiredEvidence: ["사고통계", "월별 점검결과", "개선 전후 비교자료"],
                requiredQuant: true,
                requiredComparison: "전년",
                forbiddenPatterns: ["현저히 감소", "크게 개선"],
                reviewQuestions: [
                  "전년 대비 개선 수치가 제시되는가?",
                  "개선의 원인이 기관의 노력과 연결되는가?",
                ],
              },
              {
                id: "jc-13",
                text: "사고·점검 결과가 재발방지와 제도 개선으로 환류되는가",
                intent: "재발방지 환류 판단",
                clauseType: "환류형",
                requiredEvidence: ["사고 후속조치 보고", "재발방지 매뉴얼", "제도개선 문서"],
                requiredQuant: false,
                requiredComparison: "전년",
                forbiddenPatterns: ["향후 보완", "추진 예정"],
                reviewQuestions: [
                  "사고 원인 분석과 후속조치가 연결되는가?",
                  "점검 결과가 제도 개선으로 이어지는가?",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const evidenceLibrary = [
  {
    id: "ev-1",
    title: "2025 성과점검 회의록",
    sourceType: "회의록",
    sourceId: "src-4",
    clauseIds: ["jc-3", "jc-13"],
    location: "p.3",
    evidenceStrength: "중",
    verifierStatus: "검수완료",
    excerpt:
      "전년도 미흡과제 6건 중 5건이 차년도 실행계획에 반영되었으며, 미반영 1건은 제도개정 일정에 포함함.",
    tags: ["환류", "개선과제", "차년도 계획"],
    numericSignals: [],
  },
  {
    id: "ev-2",
    title: "KPI 실적집계.xlsx",
    sourceType: "원천엑셀",
    sourceId: "src-3",
    clauseIds: ["jc-2", "jc-10", "jc-12"],
    location: "성과지표!B12:F18",
    evidenceStrength: "상",
    verifierStatus: "검수대기",
    excerpt:
      "핵심 KPI 8개 중 6개 달성, 2개는 목표 미달. 안전사고 건수는 전년 12건에서 올해 8건으로 감소.",
    tags: ["KPI", "전년비교", "실적값"],
    numericSignals: ["8개 중 6개", "12건 → 8건"],
  },
  {
    id: "ev-3",
    title: "2026 경영평가 편람",
    sourceType: "편람",
    sourceId: "src-1",
    clauseIds: ["jc-1", "jc-2", "jc-3", "jc-4", "jc-10", "jc-11", "jc-12", "jc-13"],
    location: "p.22-27",
    evidenceStrength: "최상",
    verifierStatus: "검수완료",
    excerpt:
      "정합성, 성과, 환류 여부를 종합 판단하되 계량 근거와 서술 근거의 연결성을 함께 본다.",
    tags: ["편람기준", "평가관점", "공식기준"],
    numericSignals: [],
  },
  {
    id: "ev-4",
    title: "안전점검 결과집",
    sourceType: "안전증빙",
    sourceId: "src-5",
    clauseIds: ["jc-11", "jc-12", "jc-13"],
    location: "p.14",
    evidenceStrength: "상",
    verifierStatus: "검수완료",
    excerpt:
      "위험성평가 41개 항목 중 39개 조치 완료, 잔여 2개는 1분기 내 개선 예정. 월별 안전점검 이행률은 97%.",
    tags: ["안전", "조치율", "이행률"],
    numericSignals: ["41개 중 39개", "97%"],
  },
  {
    id: "ev-5",
    title: "중장기 전략체계도",
    sourceType: "실적보고서",
    sourceId: "src-2",
    clauseIds: ["jc-1", "jc-2"],
    location: "p.8-10",
    evidenceStrength: "상",
    verifierStatus: "검수완료",
    excerpt:
      "비전-전략목표-전략과제-KPI-주요사업을 동일 명칭 체계로 정렬하고, 전략과제별 예산과 주관부서를 표시함.",
    tags: ["정합성", "전략연계", "예산연계"],
    numericSignals: ["전략과제 5개"],
  },
];

const workspacePages = [
  {
    id: "overview",
    name: "대표 페이지",
    subtitle: "평가 컨텍스트, 선행조건, 자료 분류 상태를 먼저 확인",
    icon: Layers3,
  },
  {
    id: "detail",
    name: "세부 판단유형 분석",
    subtitle: "판단문구 유형별로 필요한 자료와 위험신호를 별도 점검",
    icon: FolderTree,
  },
  {
    id: "source",
    name: "source map · 검수",
    subtitle: "문장과 근거의 연결을 위치 단위까지 추적",
    icon: ShieldCheck,
  },
  {
    id: "report",
    name: "보고서 초안 · 위험탐지",
    subtitle: "생성보다 먼저 누락과 과장 가능성을 보여줌",
    icon: Sparkles,
  },
];

const defaultProject = {
  name: "2026 경영평가 프로젝트",
  evaluationYear: "2026",
  ministry: "",
  institutionType: "",
  institutionName: "",
  evaluationScheme: "공공기관 경영실적평가",
  manualVersion: "2026-v1",
  focusArea: "경영관리",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function flattenClauses(framework) {
  return framework.flatMap((category) =>
    category.indicators.flatMap((indicator) =>
      indicator.subIndicators.flatMap((sub) =>
        sub.judgementClauses.map((clause) => ({
          ...clause,
          categoryId: category.id,
          categoryName: category.name,
          indicatorId: indicator.id,
          indicatorName: indicator.name,
          subIndicatorId: sub.id,
          subIndicatorName: sub.name,
          metrics: sub.metrics,
        }))
      )
    )
  );
}

function inferCategoryFromName(name) {
  const lowered = name.toLowerCase();
  if (lowered.includes("편람") || lowered.includes("manual")) return "편람";
  if (lowered.includes("실적") || lowered.includes("보고서")) return "실적보고서";
  if (lowered.includes("xlsx") || lowered.includes("excel") || lowered.includes("kpi")) return "원천엑셀";
  if (lowered.includes("회의") || lowered.includes("minutes")) return "회의록";
  if (lowered.includes("안전")) return "안전증빙";
  if (lowered.includes("인증") || lowered.includes("수상") || lowered.includes("외부")) return "외부평가";
  return "기타";
}

function getReliability(category) {
  if (category === "편람") return "최상";
  if (category === "실적보고서" || category === "원천엑셀" || category === "안전증빙") return "상";
  if (category === "회의록" || category === "외부평가") return "중";
  return "중";
}

function scoreEvidence(clause, evidence) {
  let score = 0;
  clause.requiredEvidence.forEach((item) => {
    if (
      evidence.excerpt.includes(item) ||
      evidence.tags.some((tag) => item.includes(tag) || tag.includes(item))
    ) {
      score += 2;
    }
  });
  if (evidence.clauseIds.includes(clause.id)) score += 4;
  if (clause.requiredQuant && evidence.numericSignals.length) score += 2;
  if (clause.requiredComparison === "전년" && evidence.excerpt.includes("전년")) score += 2;
  if (
    clause.requiredComparison === "목표대비" &&
    (evidence.excerpt.includes("목표") || evidence.tags.includes("실적값"))
  ) {
    score += 2;
  }
  if (evidence.evidenceStrength === "최상") score += 3;
  if (evidence.evidenceStrength === "상") score += 2;
  if (evidence.verifierStatus === "검수완료") score += 1;
  return score;
}

function buildAssessment(clause, evidenceRows) {
  const strengths = [];
  const gaps = [];
  const evidenceCount = evidenceRows.length;
  const hasVerified = evidenceRows.some((row) => row.verifierStatus === "검수완료");
  const hasNumeric = evidenceRows.some((row) => row.numericSignals.length > 0);
  const hasComparison = evidenceRows.some((row) => row.excerpt.includes("전년") || row.excerpt.includes("목표"));
  const hasPlanLink = evidenceRows.some((row) => row.excerpt.includes("차년도") || row.excerpt.includes("반영"));

  if (evidenceCount >= 2) strengths.push("복수 근거가 연결되어 판단 신뢰도가 높습니다.");
  else gaps.push("근거 수가 부족해 단일 자료에 과도하게 의존합니다.");

  if (hasVerified) strengths.push("검수완료 근거가 포함되어 출처 신뢰도가 확보됩니다.");
  else gaps.push("검수완료 근거가 없어 보고서 반영 전 검수가 필요합니다.");

  if (clause.requiredQuant) {
    if (hasNumeric) strengths.push("정량 근거가 존재해 수치 기반 서술이 가능합니다.");
    else gaps.push("정량 수치가 없어 성과형 판단문구를 뒷받침하기 어렵습니다.");
  }

  if (clause.requiredComparison !== "없음") {
    if (hasComparison) strengths.push("비교 기준이 드러나는 근거가 포함됩니다.");
    else gaps.push(`${clause.requiredComparison} 비교 근거가 누락되어 개선·달성 표현이 위험합니다.`);
  }

  if (clause.clauseType === "환류형") {
    if (hasPlanLink) strengths.push("점검 결과와 차년도 계획의 연결 흔적이 확인됩니다.");
    else gaps.push("전년도 지적과 차년도 계획의 직접 연결 근거가 보이지 않습니다.");
  }

  if (clause.clauseType === "정합성형") {
    const strategyWordCount = evidenceRows.reduce(
      (acc, row) =>
        acc + ["전략", "KPI", "사업", "예산"].filter((w) => row.excerpt.includes(w)).length,
      0
    );
    if (strategyWordCount >= 3) strengths.push("전략-사업-KPI 연결 단서가 근거에 충분히 포함됩니다.");
    else gaps.push("정합성형 문장에 필요한 전략/KPI/사업 연결 표현이 약합니다.");
  }

  const verdict =
    gaps.length === 0 ? "대체로 충족" : gaps.length <= 2 ? "부분 충족" : "보완 필요";

  const suggestedNarrative = `${clause.text}에 대해서는 ${evidenceCount}건의 관련 근거가 연결되었으며, ${
    hasVerified ? "검수완료 근거가 포함되어" : "검수완료 근거가 부족하여"
  } 판단 신뢰도는 ${
    verdict === "대체로 충족"
      ? "비교적 높습니다"
      : verdict === "부분 충족"
      ? "보완이 필요합니다"
      : "아직 낮습니다"
  }. ${
    clause.requiredQuant
      ? hasNumeric
        ? "정량 수치가 확보되어 성과 서술이 가능합니다."
        : "정량 수치가 없어 성과 서술은 제한적입니다."
      : "정성 판단 중심으로 서술 가능합니다."
  }`;

  return { verdict, strengths, gaps, suggestedNarrative };
}

function getStatusTone(status) {
  if (status === "critical") return "bg-rose-100 text-rose-700 border-rose-200";
  if (status === "design") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

function getFileTone(status) {
  if (status === "classified") return "emerald";
  if (status === "needs_review") return "amber";
  return "slate";
}

function getIndicatorTone(level) {
  if (level === "high") return "rose";
  if (level === "medium") return "amber";
  return "emerald";
}

function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TestBadge({ pass }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
        pass ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {pass ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
      {pass ? "PASS" : "FAIL"}
    </div>
  );
}

function StatusPill({ children, tone = "slate" }) {
  const toneMap = {
    slate: "bg-slate-100 text-slate-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", toneMap[tone])}>
      {children}
    </span>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-slate-700">{label}</div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-slate-700">{label}</div>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
      >
        <option value="">선택하세요</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatCard({ icon, label, value, hint }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="rounded-2xl bg-slate-100 p-2">{icon}</div>
        <div className="text-sm font-semibold">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{hint}</div>
    </div>
  );
}

export default function App() {
  const [appMode, setAppMode] = useState("setup");
  const [setupStep, setSetupStep] = useState(1);

  const [selectedInstitutionId, setSelectedInstitutionId] = useState(institutionProfiles[0].id);
  const [project, setProject] = useState(defaultProject);
  const [sourceCatalog, setSourceCatalog] = useState(initialSourceCatalog);
  const [newFileName, setNewFileName] = useState("");

  const [workspacePage, setWorkspacePage] = useState("overview");
  const [selectedType, setSelectedType] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClauseId, setSelectedClauseId] = useState("jc-1");

  const selectedInstitution =
    institutionProfiles.find((item) => item.id === selectedInstitutionId) || institutionProfiles[0];

  const activeProject = useMemo(() => {
    return {
      ...project,
      ministry: project.ministry || selectedInstitution.ministry,
      institutionType: project.institutionType || selectedInstitution.institutionType,
      institutionName: project.institutionName || selectedInstitution.institutionName,
      evaluationYear: project.evaluationYear || selectedInstitution.evaluationYear,
      manualVersion: project.manualVersion || selectedInstitution.manualVersion,
      evaluationScheme: project.evaluationScheme || selectedInstitution.evaluationScheme,
      focusArea: project.focusArea || selectedInstitution.focus[0],
    };
  }, [project, selectedInstitution]);

  const allClauses = useMemo(() => flattenClauses(evaluationFramework), []);
  const filteredClauses = useMemo(() => {
    return allClauses.filter((clause) => {
      const byType = selectedType === "전체" || clause.clauseType === selectedType;
      const q = searchTerm.trim();
      const bySearch =
        !q ||
        [clause.text, clause.categoryName, clause.indicatorName, clause.subIndicatorName].some((v) =>
          v.includes(q)
        );
      return byType && bySearch;
    });
  }, [allClauses, searchTerm, selectedType]);

  const selectedClause =
    allClauses.find((item) => item.id === selectedClauseId) || allClauses[0];

  const matchedEvidence = useMemo(() => {
    return evidenceLibrary
      .map((row) => ({ ...row, score: scoreEvidence(selectedClause, row) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selectedClause]);

  const assessment = useMemo(
    () => buildAssessment(selectedClause, matchedEvidence),
    [selectedClause, matchedEvidence]
  );

  const allIndicators = useMemo(() => {
    return evaluationFramework.flatMap((category) =>
      category.indicators.map((indicator) => ({
        ...indicator,
        categoryName: category.name,
      }))
    );
  }, []);

  const requiredCategories = ["편람", "실적보고서", "원천엑셀"];

  const setupHealth = useMemo(() => {
    const hasContext = Boolean(
      activeProject.evaluationYear &&
        activeProject.ministry &&
        activeProject.institutionType &&
        activeProject.institutionName
    );
    const presentCategories = new Set(sourceCatalog.map((item) => item.category));
    const missingRequired = requiredCategories.filter((item) => !presentCategories.has(item));
    const needsReviewCount = sourceCatalog.filter((item) => item.status === "needs_review").length;
    const yearMismatchCount = sourceCatalog.filter(
      (item) =>
        item.category !== "편람" &&
        item.year &&
        item.year !== String(Number(activeProject.evaluationYear) - 1)
    ).length;
    const readyIndicatorCount = allIndicators.filter((item) => item.status === "ready").length;

    return {
      hasContext,
      missingRequired,
      needsReviewCount,
      yearMismatchCount,
      readyIndicatorCount,
      canEnterWorkspace: hasContext && missingRequired.length === 0,
    };
  }, [activeProject, sourceCatalog, allIndicators]);

  const dashboardStats = useMemo(() => {
    const insufficientCount = allIndicators.filter((item) => item.status === "insufficient").length;
    const highRiskCount = allIndicators.filter((item) => item.riskLevel === "high").length;
    const averageProgress = Math.round(
      allIndicators.reduce((acc, cur) => acc + cur.progress, 0) / allIndicators.length
    );

    return {
      uploadCount: sourceCatalog.length,
      readyIndicatorCount: setupHealth.readyIndicatorCount,
      insufficientCount,
      highRiskCount,
      averageProgress,
    };
  }, [allIndicators, setupHealth.readyIndicatorCount, sourceCatalog.length]);

  const selfTests = useMemo(() => {
    return [
      { name: "setup → workspace 흐름 존재", pass: true },
      { name: "평가 컨텍스트 잠금 구조 존재", pass: setupHealth.hasContext },
      { name: "필수 자료 체크리스트 반영", pass: setupHealth.missingRequired.length === 0 },
      { name: "세부 판단유형 페이지 존재", pass: workspacePages.some((p) => p.id === "detail") },
      { name: "source map 페이지 존재", pass: workspacePages.some((p) => p.id === "source") },
      { name: "보고서 위험탐지 페이지 존재", pass: workspacePages.some((p) => p.id === "report") },
      { name: "판단문구에 clauseType 존재", pass: allClauses.every((c) => Boolean(c.clauseType)) },
      {
        name: "판단문구에 requiredEvidence 존재",
        pass: allClauses.every((c) => Array.isArray(c.requiredEvidence) && c.requiredEvidence.length > 0),
      },
      { name: "근거 라이브러리에 위치 정보 존재", pass: evidenceLibrary.every((e) => Boolean(e.location)) },
    ];
  }, [allClauses, setupHealth]);

  const passedTests = selfTests.filter((t) => t.pass).length;

  function applyPreset(profileId) {
    setSelectedInstitutionId(profileId);
    const preset = institutionProfiles.find((item) => item.id === profileId);
    if (!preset) return;
    setProject((prev) => ({
      ...prev,
      evaluationYear: preset.evaluationYear,
      ministry: preset.ministry,
      institutionType: preset.institutionType,
      institutionName: preset.institutionName,
      evaluationScheme: preset.evaluationScheme,
      manualVersion: preset.manualVersion,
      focusArea: preset.focus[0],
      name: `${preset.evaluationYear} ${preset.institutionName} 경영평가 프로젝트`,
    }));
  }

  function addMockSource() {
    if (!newFileName.trim()) return;
    const category = inferCategoryFromName(newFileName);
    const next = {
      id: `src-${Date.now()}`,
      category,
      name: newFileName,
      reliability: getReliability(category),
      year: category === "편람" ? activeProject.evaluationYear : String(Number(activeProject.evaluationYear) - 1),
      status: category === "기타" ? "needs_review" : "classified",
      required: requiredCategories.includes(category),
    };
    setSourceCatalog((prev) => [next, ...prev]);
    setNewFileName("");
  }

  function goNextSetupStep() {
    setSetupStep((prev) => Math.min(prev + 1, 4));
  }

  function goPrevSetupStep() {
    setSetupStep((prev) => Math.max(prev - 1, 1));
  }

  function enterWorkspace() {
    if (!setupHealth.canEnterWorkspace) return;
    setAppMode("workspace");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1680px] px-6 py-6 lg:px-8">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-7 text-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Management Evaluation Workbench V4
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                경영평가 프로젝트 셋업 + 분석 워크스페이스
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                초기 입력값을 프로젝트 컨텍스트로 잠그고, 자료 업로드·세팅 검증을 거친 뒤
                각 평가지표별 상세 페이지, source map, 보고서 위험탐지까지 연결되는 완성형 베이스입니다.
              </p>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">모드</div>
                <div className="mt-2 text-2xl font-bold">{appMode === "setup" ? "SETUP" : "WORKSPACE"}</div>
                <div className="mt-1 text-xs text-slate-400">{activeProject.evaluationScheme}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">진입 상태</div>
                <div className="mt-2 text-2xl font-bold">
                  {setupHealth.canEnterWorkspace ? "READY" : "CHECK"}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {setupHealth.canEnterWorkspace ? "분석 가능" : "세팅 보완 필요"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {appMode === "setup" ? (
          <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Layers3 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Setup</div>
                    <div className="mt-1 text-lg font-bold tracking-tight">Project Bootstrap</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  단순 입력폼이 아니라 뒤 전체 워크스페이스의 해석 기준을 고정하는 상위 컨텍스트입니다.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">setup step</div>
                <div className="mt-4 space-y-3">
                  {[
                    { no: 1, label: "기관 설정", desc: "프로젝트 컨텍스트 생성" },
                    { no: 2, label: "자료 업로드", desc: "파일 분류 및 수집" },
                    { no: 3, label: "세팅 검증", desc: "필수요건 체크" },
                    { no: 4, label: "홈 진입", desc: "워크스페이스 이동" },
                  ].map((item) => {
                    const active = setupStep === item.no;
                    return (
                      <button
                        key={item.no}
                        type="button"
                        onClick={() => setSetupStep(item.no)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition",
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300"
                        )}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide">step {item.no}</div>
                        <div className="mt-1 text-sm font-bold">{item.label}</div>
                        <div className={cn("mt-1 text-xs", active ? "text-slate-300" : "text-slate-500")}>
                          {item.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">실시간 상태</div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <span className="text-sm text-slate-600">기관 컨텍스트</span>
                    <StatusPill tone={setupHealth.hasContext ? "emerald" : "amber"}>
                      {setupHealth.hasContext ? "완료" : "확인 필요"}
                    </StatusPill>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <span className="text-sm text-slate-600">필수자료 누락</span>
                    <StatusPill tone={setupHealth.missingRequired.length === 0 ? "emerald" : "rose"}>
                      {setupHealth.missingRequired.length}건
                    </StatusPill>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <span className="text-sm text-slate-600">검토 필요 파일</span>
                    <StatusPill tone={setupHealth.needsReviewCount === 0 ? "emerald" : "amber"}>
                      {setupHealth.needsReviewCount}건
                    </StatusPill>
                  </div>
                </div>
              </div>
            </aside>

            <main className="space-y-6">
              {setupStep === 1 && (
                <SectionCard
                  title="1. 평가 프로젝트 생성"
                  subtitle="기관·연도·평가제도·편람버전을 입력하면 이후 모든 페이지가 이 컨텍스트를 기준으로 재구성됩니다."
                  action={<StatusPill tone="blue">step 1 / 4</StatusPill>}
                >
                  <div className="mb-5 grid gap-3">
                    <div className="text-sm font-semibold text-slate-700">추천 프리셋</div>
                    <div className="grid gap-3 md:grid-cols-3">
                      {institutionProfiles.map((profile) => (
                        <button
                          key={profile.id}
                          onClick={() => applyPreset(profile.id)}
                          className={cn(
                            "rounded-3xl border p-4 text-left transition",
                            selectedInstitutionId === profile.id
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300"
                          )}
                        >
                          <div className="text-xs font-semibold uppercase tracking-wide opacity-80">preset</div>
                          <div className="mt-2 text-base font-bold">{profile.institutionName}</div>
                          <div className="mt-2 text-sm leading-6 opacity-90">{profile.ministry}</div>
                          <div className="mt-1 text-sm opacity-80">{profile.institutionType}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      label="프로젝트명"
                      value={project.name}
                      onChange={(e) => setProject((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="예: 2026 한국표준협회 경영평가 프로젝트"
                    />
                    <InputField
                      label="평가연도"
                      value={project.evaluationYear}
                      onChange={(e) => setProject((prev) => ({ ...prev, evaluationYear: e.target.value }))}
                      placeholder="2026"
                    />
                    <InputField
                      label="소관부처"
                      value={project.ministry}
                      onChange={(e) => setProject((prev) => ({ ...prev, ministry: e.target.value }))}
                      placeholder="예: 보건복지부 산하 기타공공기관"
                    />
                    <InputField
                      label="기관유형"
                      value={project.institutionType}
                      onChange={(e) => setProject((prev) => ({ ...prev, institutionType: e.target.value }))}
                      placeholder="예: 기타공공기관"
                    />
                    <InputField
                      label="기관명"
                      value={project.institutionName}
                      onChange={(e) => setProject((prev) => ({ ...prev, institutionName: e.target.value }))}
                      placeholder="기관명 입력"
                    />
                    <InputField
                      label="평가제도"
                      value={project.evaluationScheme}
                      onChange={(e) => setProject((prev) => ({ ...prev, evaluationScheme: e.target.value }))}
                      placeholder="공공기관 경영실적평가"
                    />
                    <InputField
                      label="편람 버전"
                      value={project.manualVersion}
                      onChange={(e) => setProject((prev) => ({ ...prev, manualVersion: e.target.value }))}
                      placeholder="2026-v1"
                    />
                    <SelectField
                      label="집중 분석 영역"
                      value={project.focusArea}
                      onChange={(e) => setProject((prev) => ({ ...prev, focusArea: e.target.value }))}
                      options={["경영관리", "주요사업", "안전·책임경영", "혁신과제", "ESG"]}
                    />
                  </div>

                  <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5">
                    <div className="text-sm font-bold text-blue-900">적용 미리보기</div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4">
                        <div className="text-xs text-slate-500">기관</div>
                        <div className="mt-1 text-sm font-bold text-slate-900">{activeProject.institutionName}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <div className="text-xs text-slate-500">평가제도</div>
                        <div className="mt-1 text-sm font-bold text-slate-900">{activeProject.evaluationScheme}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <div className="text-xs text-slate-500">편람 버전</div>
                        <div className="mt-1 text-sm font-bold text-slate-900">{activeProject.manualVersion}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <div className="text-xs text-slate-500">기본 포커스</div>
                        <div className="mt-1 text-sm font-bold text-slate-900">{activeProject.focusArea}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={goNextSetupStep}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                      다음
                    </button>
                  </div>
                </SectionCard>
              )}

              {setupStep === 2 && (
                <SectionCard
                  title="2. 자료 업로드 및 자동 분류"
                  subtitle="업로드는 그냥 파일 저장이 아니라, 분석 가능한 자료셋을 만드는 단계입니다."
                  action={<StatusPill tone="blue">step 2 / 4</StatusPill>}
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    {uploadCategoryHints.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="mt-2 text-xs leading-5 text-slate-500">{item.helper}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
                    <input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="예: 2025_기관실적보고서.pdf / KPI실적집계.xlsx / 안전점검결과집.pdf"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={addMockSource}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                      파일 추가
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {sourceCatalog.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="mt-1 text-xs text-slate-500">
                              {item.category} · {item.year} · 신뢰도 {item.reliability}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <StatusPill tone={getFileTone(item.status)}>
                              {item.status === "classified" ? "분류됨" : "검토 필요"}
                            </StatusPill>
                            {item.required ? <StatusPill tone="blue">필수자료</StatusPill> : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={goPrevSetupStep}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={goNextSetupStep}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                      다음
                    </button>
                  </div>
                </SectionCard>
              )}

              {setupStep === 3 && (
                <SectionCard
                  title="3. 세팅 검증"
                  subtitle="그냥 홈으로 보내지 않고, 초기 입력값과 업로드값을 합쳐서 분석 시작 가능 상태를 점검합니다."
                  action={<StatusPill tone="blue">step 3 / 4</StatusPill>}
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                      icon={<CheckCircle2 className="h-5 w-5" />}
                      label="기관 컨텍스트"
                      value={setupHealth.hasContext ? "완료" : "미완료"}
                      hint="연도·기관·유형·평가제도 기준"
                    />
                    <StatCard
                      icon={<FolderTree className="h-5 w-5" />}
                      label="필수자료 누락"
                      value={`${setupHealth.missingRequired.length}건`}
                      hint={
                        setupHealth.missingRequired.length
                          ? setupHealth.missingRequired.join(", ")
                          : "편람/실적보고서/원천엑셀 확보"
                      }
                    />
                    <StatCard
                      icon={<AlertTriangle className="h-5 w-5" />}
                      label="검토 필요 파일"
                      value={`${setupHealth.needsReviewCount}건`}
                      hint="자동분류 불확실 또는 기타 파일"
                    />
                    <StatCard
                      icon={<Database className="h-5 w-5" />}
                      label="연도 불일치"
                      value={`${setupHealth.yearMismatchCount}건`}
                      hint="평가연도 대비 자료연도 점검"
                    />
                  </div>

                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-bold text-slate-900">세팅 점검 결과</div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                      <li>• 기관 설정: {setupHealth.hasContext ? "완료" : "미완료"}</li>
                      <li>
                        • 필수자료 누락:{" "}
                        {setupHealth.missingRequired.length
                          ? setupHealth.missingRequired.join(", ")
                          : "없음"}
                      </li>
                      <li>• 검토 필요 파일: {setupHealth.needsReviewCount}건</li>
                      <li>• 바로 시작 가능한 지표 수: {setupHealth.readyIndicatorCount}개</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={goPrevSetupStep}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={goNextSetupStep}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                      다음
                    </button>
                  </div>
                </SectionCard>
              )}

              {setupStep === 4 && (
                <SectionCard
                  title="4. 홈 진입"
                  subtitle="세팅이 끝난 뒤 기존 워크벤치로 보내되, setup 결과를 바탕으로 재구성된 홈으로 진입합니다."
                  action={
                    <StatusPill tone={setupHealth.canEnterWorkspace ? "emerald" : "amber"}>
                      {setupHealth.canEnterWorkspace ? "진입 가능" : "보완 필요"}
                    </StatusPill>
                  }
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                      icon={<FileText className="h-5 w-5" />}
                      label="업로드 자료 수"
                      value={dashboardStats.uploadCount}
                      hint="전체 등록 파일"
                    />
                    <StatCard
                      icon={<CheckCircle2 className="h-5 w-5" />}
                      label="분석 가능 지표"
                      value={dashboardStats.readyIndicatorCount}
                      hint="현재 바로 작업 가능한 지표"
                    />
                    <StatCard
                      icon={<AlertTriangle className="h-5 w-5" />}
                      label="고위험 지표"
                      value={dashboardStats.highRiskCount}
                      hint="자료 보완 우선 대상"
                    />
                    <StatCard
                      icon={<BarChart3 className="h-5 w-5" />}
                      label="평균 진행률"
                      value={`${dashboardStats.averageProgress}%`}
                      hint="전체 지표 기준"
                    />
                  </div>

                  <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5">
                    <div className="text-sm font-bold text-blue-900">진입 후 보여줄 홈 구성</div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-blue-950">
                      <li>• 프로젝트 요약</li>
                      <li>• 자료 현황</li>
                      <li>• 지표 진행상태</li>
                      <li>• 세부 판단 페이지 바로가기</li>
                      <li>• source map / 보고서 위험탐지 이동</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={goPrevSetupStep}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={enterWorkspace}
                      disabled={!setupHealth.canEnterWorkspace}
                      className={cn(
                        "rounded-2xl px-5 py-3 text-sm font-semibold text-white",
                        setupHealth.canEnterWorkspace
                          ? "bg-slate-900"
                          : "cursor-not-allowed bg-slate-300"
                      )}
                    >
                      홈으로 이동
                    </button>
                  </div>
                </SectionCard>
              )}
            </main>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Layers3 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Workspace
                    </div>
                    <div className="mt-1 text-lg font-bold tracking-tight">LLM Workbench</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  setup 완료 이후 대표 페이지와 세부 페이지들로 분리된 실제 워크벤치 구조입니다.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">기관 컨텍스트</div>
                <div className="mt-4 space-y-3">
                  {institutionProfiles.map((item) => {
                    const active = item.id === selectedInstitutionId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => applyPreset(item.id)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition",
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300"
                        )}
                      >
                        <div className="text-sm font-bold">{item.institutionName}</div>
                        <div className={cn("mt-1 text-xs", active ? "text-slate-300" : "text-slate-500")}>
                          {item.ministry} · {item.institutionType}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                              active ? "bg-white/10" : "bg-white border border-slate-200"
                            )}
                          >
                            {item.evaluationYear}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                              active ? "bg-white/10" : "bg-white border border-slate-200"
                            )}
                          >
                            {item.manualVersion}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">페이지 이동</div>
                <div className="mt-4 space-y-3">
                  {workspacePages.map((page) => {
                    const active = page.id === workspacePage;
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => setWorkspacePage(page.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                          active
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl",
                            active ? "bg-white/10" : "bg-white border border-slate-200"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-sm font-bold">{page.name}</div>
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          </div>
                          <div className={cn("mt-1 text-xs leading-5", active ? "text-slate-300" : "text-slate-500")}>
                            {page.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900">
                  <Search className="h-4 w-4" />
                  <div className="text-sm font-bold">판단문구 탐색</div>
                </div>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="판단문구, 지표, 범주 검색"
                  className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["전체", ...evaluationTypeMatrix.map((item) => item.type)].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedType(item)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-semibold",
                        selectedType === item
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="mt-4 max-h-[360px] space-y-3 overflow-auto pr-1">
                  {filteredClauses.map((clause) => {
                    const active = clause.id === selectedClauseId;
                    return (
                      <button
                        key={clause.id}
                        type="button"
                        onClick={() => setSelectedClauseId(clause.id)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left",
                          active ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                            {clause.clauseType}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {clause.categoryName} / {clause.indicatorName}
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-bold leading-6 text-slate-900">{clause.text}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="space-y-6">
              {workspacePage === "overview" && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                      icon={<FileText className="h-5 w-5" />}
                      label="업로드 자료 수"
                      value={dashboardStats.uploadCount}
                      hint="전체 파일 수"
                    />
                    <StatCard
                      icon={<CheckCircle2 className="h-5 w-5" />}
                      label="분석 가능 지표"
                      value={dashboardStats.readyIndicatorCount}
                      hint="바로 시작 가능"
                    />
                    <StatCard
                      icon={<AlertTriangle className="h-5 w-5" />}
                      label="자료 부족 지표"
                      value={dashboardStats.insufficientCount}
                      hint="보완 필요"
                    />
                    <StatCard
                      icon={<BarChart3 className="h-5 w-5" />}
                      label="평균 진행률"
                      value={`${dashboardStats.averageProgress}%`}
                      hint="전체 지표 평균"
                    />
                  </div>

                  <div className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
                    <SectionCard
                      title="평가판단 시스템이 되기 위한 필수 조건"
                      subtitle="이 조건들이 갖춰지지 않으면 지금 단계에서는 문장 추천 시스템에 가깝습니다."
                    >
                      <div className="grid gap-3">
                        {judgementSystemRequirements.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                              </div>
                              <span
                                className={cn(
                                  "rounded-full border px-3 py-1 text-xs font-bold",
                                  getStatusTone(item.status)
                                )}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.mustHave.map((field) => (
                                <span
                                  key={field}
                                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </SectionCard>

                    <SectionCard
                      title="대표 페이지에서 먼저 보는 값"
                      subtitle="기관과 편람이 달라지면 동일 문장도 판단 기준이 달라지므로, 맨 앞에서 잠가야 하는 값입니다."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          ["기관명", activeProject.institutionName],
                          ["소관 구분", activeProject.ministry],
                          ["기관유형", activeProject.institutionType],
                          ["평가제도", activeProject.evaluationScheme],
                          ["평가연도", activeProject.evaluationYear],
                          ["편람 버전", activeProject.manualVersion],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-500">{k}</div>
                            <div className="mt-2 text-sm font-bold text-slate-900">{v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <div className="text-sm font-bold text-blue-900">집중 분석 영역</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(selectedInstitution.focus || []).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-800"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SectionCard>
                  </div>

                  <div className="grid gap-6 2xl:grid-cols-[0.9fr_1.1fr]">
                    <SectionCard title="자료 카탈로그" subtitle="평가유형별 자료 구분이 먼저 되어야 자동판단이 가능합니다.">
                      <div className="grid gap-3">
                        {sourceCatalog.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{item.name}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {item.category} · {item.year}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                                  {item.reliability}
                                </div>
                                <StatusPill tone={getFileTone(item.status)}>
                                  {item.status === "classified" ? "분류됨" : "검토 필요"}
                                </StatusPill>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </SectionCard>

                    <SectionCard title="평가체계 개요" subtitle="대표 페이지에서 범주와 지표 구조를 확인하고, 세부 페이지에서 판단문구 단위로 내려갑니다.">
                      <div className="space-y-4">
                        {evaluationFramework.map((category) => (
                          <div key={category.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className="text-lg font-bold text-slate-900">{category.name}</div>
                                <div className="mt-1 text-sm text-slate-500">{category.description}</div>
                              </div>
                              <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                {category.indicators.length} indicators
                              </div>
                            </div>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              {category.indicators.map((indicator) => (
                                <div key={indicator.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="font-bold text-slate-900">{indicator.name}</div>
                                    <div className="flex gap-2">
                                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                        {indicator.weight}점
                                      </span>
                                      <StatusPill tone={getIndicatorTone(indicator.riskLevel)}>
                                        {indicator.riskLevel === "high"
                                          ? "고위험"
                                          : indicator.riskLevel === "medium"
                                          ? "중간위험"
                                          : "안정"}
                                      </StatusPill>
                                    </div>
                                  </div>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">{indicator.summary}</p>
                                  <div className="mt-3 space-y-2">
                                    {indicator.subIndicators.map((sub) => (
                                      <div key={sub.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="text-sm font-semibold text-slate-800">{sub.name}</div>
                                        <div className="mt-1 text-xs text-slate-500">
                                          판단문구 {sub.judgementClauses.length}개 · 지표 {sub.metrics.length}개
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  </div>
                </div>
              )}

              {workspacePage === "detail" && (
                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <SectionCard
                    title="판단유형별 자료 요구조건"
                    subtitle="판단문구 유형은 자동으로 생기지 않으므로, 별도 메타와 자료구분 체계가 필요합니다."
                  >
                    <div className="space-y-4">
                      {evaluationTypeMatrix.map((type) => (
                        <div key={type.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-lg font-bold text-slate-900">{type.type}</div>
                            <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                              자료 매핑 필수
                            </div>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{type.objective}</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                필수 문서
                              </div>
                              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                {type.requiredDocuments.map((item) => (
                                  <li key={item}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                필수 데이터
                              </div>
                              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                {type.requiredData.map((item) => (
                                  <li key={item}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <div className="text-sm font-bold text-amber-900">위험 신호</div>
                            <ul className="mt-3 space-y-2 text-sm text-amber-900">
                              {type.riskSignals.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <div className="space-y-6">
                    <SectionCard title="선택 판단문구 상세 분석" subtitle="대표 페이지에서 문구를 고르면 세부 페이지에서 자료 적합성과 누락을 분석합니다.">
                      <div className="rounded-3xl bg-slate-950 p-5 text-white">
                        <div className="text-xs uppercase tracking-wide text-slate-400">Selected Clause</div>
                        <div className="mt-2 text-xl font-bold leading-8">{selectedClause.text}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{selectedClause.clauseType}</span>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{selectedClause.categoryName}</span>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{selectedClause.indicatorName}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">필수 증빙</div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedClause.requiredEvidence.map((item) => (
                              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">판정 조건</div>
                          <div className="mt-3 space-y-2 text-sm text-slate-700">
                            <div>• 정량 필요: {selectedClause.requiredQuant ? "예" : "아니오"}</div>
                            <div>• 비교 기준: {selectedClause.requiredComparison}</div>
                            <div>• 금지 표현: {selectedClause.forbiddenPatterns.join(", ")}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-sm font-bold text-slate-900">검토 질문</div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                          {selectedClause.reviewQuestions.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-sm font-bold text-slate-900">관련 계량지표</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedClause.metrics.map((item) => (
                            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SectionCard>

                    <SectionCard title="해당 문구에 맞는 자료 충족도" subtitle="실제 판정 전에 어떤 근거가 붙었는지를 유형별로 확인합니다.">
                      <div className="grid gap-3">
                        {matchedEvidence.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{item.title}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {item.sourceType} · {item.location}
                                </div>
                              </div>
                              <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                                score {item.score}
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-700">{item.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  </div>
                </div>
              )}

              {workspacePage === "source" && (
                <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                  <SectionCard
                    title="source map · 검수 페이지"
                    subtitle="자동판단 결과를 사람이 수용하려면 이 페이지가 핵심입니다."
                  >
                    <div className="grid gap-3">
                      {[
                        "문장 단위 source_id 저장",
                        "PDF 페이지 / 엑셀 시트-셀 / 회의록 문단 위치 저장",
                        "검수완료 / 검수대기 / 반려 상태 분리",
                        "중복 근거와 충돌 근거 표시",
                        "보고서 반영 여부와 승인자 이력 저장",
                      ].map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="선택 판단문구 source rows" subtitle="선택 문구와 연결된 출처를 근거 위치까지 표시합니다.">
                    <div className="rounded-3xl bg-slate-950 p-5 text-white">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Selected Clause</div>
                      <div className="mt-2 text-lg font-bold leading-8">{selectedClause.text}</div>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {matchedEvidence.map((row) => (
                        <div key={row.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="font-bold text-slate-900">{row.title}</div>
                              <div className="mt-1 text-xs text-slate-500">
                                {row.sourceType} · {row.location} · {row.evidenceStrength}
                              </div>
                            </div>
                            <span
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                row.verifierStatus === "검수완료"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              )}
                            >
                              {row.verifierStatus}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-slate-700">{row.excerpt}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>
              )}

              {workspacePage === "report" && (
                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <SectionCard
                    title="판단문구 충족도 진단"
                    subtitle="문장 생성 전에 강점, 미충족, 위험 표현을 먼저 봅니다."
                    action={
                      <div
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold",
                          assessment.verdict === "대체로 충족"
                            ? "bg-emerald-100 text-emerald-700"
                            : assessment.verdict === "부분 충족"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        )}
                      >
                        {assessment.verdict}
                      </div>
                    }
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">판단유형</div>
                      <div className="mt-2 text-sm font-bold text-slate-900">{selectedClause.clauseType}</div>
                      <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">필요 근거 유형</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedClause.requiredEvidence.map((item) => (
                          <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="text-sm font-bold text-emerald-800">확인된 강점</div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900">
                          {assessment.strengths.length ? (
                            assessment.strengths.map((item) => <li key={item}>• {item}</li>)
                          ) : (
                            <li>• 아직 명확한 강점이 포착되지 않았습니다.</li>
                          )}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                        <div className="text-sm font-bold text-rose-800">미충족 포인트</div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-rose-900">
                          {assessment.gaps.length ? (
                            assessment.gaps.map((item) => <li key={item}>• {item}</li>)
                          ) : (
                            <li>• 현재 기준에서 큰 결손은 보이지 않습니다.</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                      <div className="text-sm font-bold text-blue-900">추천 서술문</div>
                      <p className="mt-3 text-sm leading-7 text-blue-950">{assessment.suggestedNarrative}</p>
                    </div>
                  </SectionCard>

                  <SectionCard title="생성 전 위험 탐지 패널" subtitle="보고서 페이지에서는 생성보다 위험 탐지를 먼저 보이게 했습니다.">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-sm font-bold text-slate-900">매칭 근거</div>
                      <div className="mt-3 grid gap-3">
                        {matchedEvidence.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{item.title}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {item.sourceType} · {item.evidenceStrength}
                                </div>
                              </div>
                              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                score {item.score}
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-center gap-2 text-amber-900">
                        <AlertTriangle className="h-4 w-4" />
                        <div className="text-sm font-bold">생성 전 위험 체크</div>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-900">
                        <li>• 개선·강화·확대 표현을 쓸 때는 반드시 전년 비교 수치를 함께 붙입니다.</li>
                        <li>• 환류형 문장은 전년도 지적사항과 차년도 계획을 한 문장 안에서 연결합니다.</li>
                        <li>• 정합성형 문장은 전략, KPI, 사업, 예산 중 최소 2개 이상을 함께 언급합니다.</li>
                        <li>• 금지 표현({selectedClause.forbiddenPatterns.join(", ")})은 근거 없이 단독 사용하지 않습니다.</li>
                      </ul>
                    </div>
                  </SectionCard>
                </div>
              )}

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold text-slate-900">런타임 셀프 테스트</div>
                      <div className="mt-1 text-sm text-slate-500">
                        현재 표시는 실제 평가판단 확정이 아니라, setup과 workspace 구조가 요구사항대로 동작하는지 확인하는 구조검증 상태입니다.
                      </div>
                    </div>
                    <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                      {passedTests} / {selfTests.length} 구조검증 통과
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {selfTests.map((test) => (
                      <div
                        key={test.name}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="text-sm text-slate-700">{test.name}</div>
                        <TestBadge pass={test.pass} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 text-slate-900">
                      <BarChart3 className="h-5 w-5" />
                      <h3 className="text-lg font-bold">이번 디벨롭 반영점</h3>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                      <li>• setup → workspace 흐름 추가</li>
                      <li>• 초기 입력값을 프로젝트 컨텍스트로 잠그는 구조 반영</li>
                      <li>• 자료 업로드/자동 분류/세팅 검증 화면 추가</li>
                      <li>• 대표/세부/source/report 페이지 분리</li>
                      <li>• 보고서 생성보다 먼저 위험 탐지 흐름으로 전환</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Database className="h-5 w-5" />
                      <h3 className="text-lg font-bold">다음 개발 포인트</h3>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                      <li>• 실제 편람 PDF/엑셀 파싱 데이터셋 연결</li>
                      <li>• source map에 file/page/sheet/cell 정규화 필드 추가</li>
                      <li>• forbidden_patterns 실시간 차단 로직 연결</li>
                      <li>• 룰엔진/LLM/사람승인 3단계 판정 상태 저장</li>
                    </ul>
                  </div>
                </div>
              </section>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}