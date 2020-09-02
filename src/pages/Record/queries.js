const daypurgeQuery = { query: `query {
    daytotalpurge{
      date
      purge
    
    }
  }`,
};

const daytotalQuery = { query: `query {
    daytotalrecord{
      date
      ok
      ng
      remainning
    }
  }`,
};

const weekpurgeQuery = { query: `query {
    weektotalpurge{
      week
      purge
    }
  }`,
};

const weektotalQuery = { query: `query {
    weektotalrecord{
      week
      ok
      ng
      remainning
    }
  }`,
};

export { 
    daypurgeQuery,
    daytotalQuery,
    weekpurgeQuery,
    weektotalQuery 
}